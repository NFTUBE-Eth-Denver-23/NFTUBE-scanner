import { Collection, CollectionType } from '@/types/Collection'

import Config from 'react-native-config'
import { getChainTagById } from '@/utils/getChain'
import { instance } from './requester'

export async function queryCollection(collectionId: string) {
  try {
    const { data } = await instance.get(`query_collection/${collectionId}`)
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryCollection: ', err.message)
    throw Error()
  }
}

interface CollectionsQueryParams {
  isCreatedByUinc?: boolean
  category?: CollectionType
  creatorAddress?: string
  filterTest?: boolean
  chain?: string
  filterTestOverride?: boolean
  //for query hidden collections
  userId?: string
}

export async function queryCollections(params: CollectionsQueryParams) {
  try {
    params.category = params.category || CollectionType.ALL
    params.filterTest = true
    params.filterTestOverride = true

    const { data } = await instance.get(
      `query_collections?API_KEY=${Config.API_KEY}`,
      {
        params: {
          QUERY_PARAMS: JSON.stringify(params),
        },
      },
    )

    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryCollections: ', err)
    throw Error()
  }
}

export async function queryCollectionScanAndViewCount(collectionId: string) {
  try {
    const { data } = await instance.get(
      `query_collection_scan_and_view_count/${collectionId}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryCollectionScanAndViewCount: ', err)
    throw Error()
  }
}

export const getCollectionsOnChain = async (
  address: string,
  chainId: number,
) => {
  const chainTag = getChainTagById(chainId)
  const { data } = await instance.get(
    `https://deep-index.moralis.io/api/v2/${address}/nft/collections`,
    {
      params: { chain: chainTag },
      headers: {
        accept: 'application/json',
        'X-API-Key': Config.NEXT_PUBLIC_MORALIS_API_KEY,
      },
    },
  )

  const collectionsInfo = await Promise.all(
    data.result.map(async (d: any) => {
      let { data: nftData } = await instance.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft`,
        {
          params: {
            chain: chainTag,
            limit: 1,
            token_addresses: d.token_address,
            normalizeMetadata: true,
          },
          headers: {
            accept: 'application/json',
            'X-API-Key': Config.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        },
      )
      const singleNFT = nftData.result[0]
      return {
        mainPhoto: singleNFT.normalized_metadata.image,
        name: singleNFT.name,
        symbol: singleNFT.symbol,
        collectionId: singleNFT.token_address,
        address: singleNFT.token_address,
        standard: singleNFT.contract_type,
      }
    }),
  )

  return collectionsInfo
}

export const queryCollectionUserRelation = async ({
  collectionId,
  userId,
}: {
  collectionId: string
  userId: string
}) => {
  try {
    const { data } = await instance.get(
      `query_collection_user_relation/${collectionId}/${userId}?API_KEY=${Config.API_KEY}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryCollectionUserRelation: ', err)
    throw Error()
  }
}

export const queryUserLikedCollections = async ({
  userId,
  chainId,
}: {
  userId: string
  chainId: number
}) => {
  try {
    const { data } = await instance.get(
      `query_user_liked_collections/${userId}?API_KEY=${Config.API_KEY}`,
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
    console.log('failed queryUserLikedCollections: ', err)
  }
}

export async function saveCollection({
  collection,
}: {
  collection: Collection
}) {
  try {
    const { data } = await instance.post(
      `save_collection?API_KEY=${Config.API_KEY}`,
      {
        data: collection,
      },
    )

    if (data.success) {
      return data.message
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed saveCollection: ', err)
    throw Error()
  }
}

export async function likeCollection({
  collectionId,
  userId,
}: {
  collectionId: string
  userId: string
}) {
  try {
    const { data } = await instance.post(
      `like_collection/${collectionId}/${userId}?API_KEY=${Config.API_KEY}`,
      {},
    )

    return data
  } catch (err) {
    console.log('failed likeCollection: ', err)
    throw Error(err)
  }
}

export async function unlikeCollection({
  collectionId,
  userId,
}: {
  collectionId: string
  userId: string
}) {
  try {
    const { data } = await instance.post(
      `unlike_collection/${collectionId}/${userId}?API_KEY=${Config.API_KEY}`,
      {},
    )

    return data
  } catch (err) {
    console.log('failed unlikeCollection: ', err)
    throw Error(err)
  }
}
