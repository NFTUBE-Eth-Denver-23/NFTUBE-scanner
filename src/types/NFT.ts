import { Asset } from './Asset'
import uuid from 'react-native-uuid'

export interface NFT {
  nftId?: string
  name?: string
  chain?: string
  imageURL?: string
  tokenId: number
  description?: string
  ownerAddress: string
  scanCount?: number
  viewCount?: number
  supply?: number
  collectionAddress: string
  collectionId?: string
  marketplaceURL?: string
  creatorAddress: string
  isListed?: boolean
  signature?: string
  isMinted?: boolean
  mintPrice?: number
  assets?: Array<Asset>
  traits?: Array<Trait>
}

export interface NFTUserRelation {
  isLiked: boolean
}

export interface MoralisNFT {
  amount: string
  block_number: string
  block_number_minted: string
  contract_type: string
  last_metadata_sync: string
  last_token_uri_sync: string
  metadata: string
  minter_address: string
  name: string
  normalized_metadata: {
    image: string
    name: string
  }
  owner_of: string
  symbol: string
  token_address: string
  token_hash: string
  token_id: string
  token_uri: string
}

export interface Trait {
  trait_type: string
  value: string
}

export const DefaultNFT = {
  nftId: uuid.v4(),
  name: '',
  imageURL: '',
  chain: '',
  tokenId: 0,
  description: '',
  ownerAddress: '',
  scanCount: 0,
  viewCount: 0,
  supply: 1,
  collectionAddress: '',
  collectionId: '',
  marketplaceURL: '',
  creatorAddress: '',
  isListed: true,
  isMinted: false,
  mintPrice: 0,
  assets: [],
  traits: [],
}
