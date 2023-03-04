import { getChain, getChainTagById } from '@/utils/getChain'

import Config from 'react-native-config'
import { NFT } from 'types/NFT'
import { instance } from './requester'

export async function queryNFTsByCollectionId(collectionId: string) {
  try {
    const { data } = await instance.get(
      `query_nfts_by_collection_id/${collectionId}?API_KEY=${Config.API_KEY}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryNFTsByCollectionId: ', err)
    throw Error()
  }
}

export async function queryNFTById(nftId: string) {
  try {
    const { data } = await instance.get(`query_nft/${nftId}`)
    if (data.success) {
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryNFTById: ', err)
    throw Error()
  }
}

export async function queryNFTsByAddressesAndTokenIds(
  params: Array<{
    collectionAddress: string
    tokenId: number
  }>,
) {
  try {
    const { data } = await instance.get(
      `query_nfts_by_collection_addresses_and_token_ids?API_KEY=${Config.API_KEY}`,
      {
        params: {
          QUERY_PARAMS: JSON.stringify({
            addressesAndTokenIds: params,
          }),
        },
      },
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryNFTsByAddressesAndTokenIds: ', err)
    throw Error()
  }
}

export const getNFTsOnChain = async ({
  chainId,
  ownerAddress,
  tokenAddress,
  cursor,
}: {
  chainId: number
  ownerAddress: string
  tokenAddress?: string
  cursor?: string
}) => {
  const chainTag = getChain(chainId).chainTag

  let { data: nftData } = await instance.get(
    `https://deep-index.moralis.io/api/v2/${ownerAddress}/nft`,
    {
      params: {
        chain: chainTag,
        token_addresses: tokenAddress,
        normalizeMetadata: true,
        cursor,
      },
      headers: {
        accept: 'application/json',
        'X-API-Key': Config.NEXT_PUBLIC_MORALIS_API_KEY,
      },
    },
  )

  return nftData.result
}

export const queryNFTUserRelation = async ({
  nftId,
  userId,
}: {
  nftId: string
  userId: string
}) => {
  try {
    const { data } = await instance.get(
      `query_nft_user_relation/${nftId}/${userId}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryNFTUserRelation: ', err)
    throw Error()
  }
}

export const queryUserLikedNFTs = async ({
  userId,
  chainId,
}: {
  userId: string
  chainId: number
}) => {
  try {
    const { data } = await instance.get(
      `query_user_liked_nfts/${userId}/${chainId}?API_KEY=${Config.API_KEY}`,
      {
        params: {
          chain: getChainTagById(chainId),
        },
      },
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryUserLikedNFTs: ', err)
  }
}

export async function saveNFTsAndAssets({
  nfts,
  skipMetadataUpload,
  assetCreatorAddress,
  userId,
}: {
  nfts: Array<NFT>
  userId: string
  skipMetadataUpload: boolean
  assetCreatorAddress: string
}) {
  try {
    const formattedNFTs = nfts.map(nft => {
      let nftData = { ...nft }
      delete nftData.assets
      delete nftData.traits
      return {
        nftData,
        assets: nft.assets,
        traits: nft.traits,
        assetCreatorAddress,
        assetCreatorId: userId,
        skipMetadataUpload,
      }
    })

    const { data } = await instance.post(
      `create_assets_and_save_nfts?API_KEY=${Config.API_KEY}`,
      {
        data: formattedNFTs,
      },
    )

    return data
  } catch (err) {
    console.log('failed saveNFTsAndAssets: ', err)
    throw Error(err)
  }
}

export async function updateNFT({
  nftId,
  name,
  description,
  marketplaceURL,
}: {
  nftId: string
  name: string
  description: string
  marketplaceURL: string
}) {
  try {
    const { data } = await instance.put(
      `update_nft/${nftId}?API_KEY=${Config.API_KEY}`,
      {
        data: {
          name,
          description,
          marketplaceURL,
        },
      },
    )

    return data
  } catch (err) {
    console.log('failed updateNFT: ', err)
    throw Error(err)
  }
}

export async function likeNFT({
  nftId,
  userId,
}: {
  nftId: string
  userId: string
}) {
  try {
    const { data } = await instance.post(
      `like_nft/${nftId}/${userId}?API_KEY=${Config.API_KEY}`,
      {
        userId,
      },
    )

    return data
  } catch (err) {
    console.log('failed likeNFT: ', err)
    throw Error(err)
  }
}

export async function unlikeNFT({
  nftId,
  userId,
}: {
  nftId: string
  userId: string
}) {
  try {
    const { data } = await instance.post(
      `unlike_nft/${nftId}/${userId}?API_KEY=${Config.API_KEY}`,
      {},
    )

    return data
  } catch (err) {
    console.log('failed unlikeNFT: ', err)
    throw Error(err)
  }
}

export async function incrementNFTViewCount({ nftId }: { nftId: string }) {
  try {
    const { data } = await instance.post(
      `increment_nft_view_count/${nftId}?API_KEY=${Config.API_KEY}`,
      {},
    )

    return data
  } catch (err) {
    console.log('failed incrementNFTViewCount: ', err)
    throw Error(err)
  }
}

export async function incrementNFTScanCount({ nftId }: { nftId: string }) {
  try {
    const { data } = await instance.post(
      `increment_nft_scan_count/${nftId}?API_KEY=${Config.API_KEY}`,
      {},
    )

    return data
  } catch (err) {
    console.log('failed incrementNFTScanCount: ', err)
    throw Error(err)
  }
}
