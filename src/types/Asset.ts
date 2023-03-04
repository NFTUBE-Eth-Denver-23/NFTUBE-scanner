import uuid from 'react-native-uuid'

export enum AssetType {
  IMAGE = 'image',
}

export interface Asset {
  assetId?: string
  visibility?: boolean
  processed?: number
  nftId?: string
  creatorAddress?: string
  creatorId?: string
  assetURL?: string
  assetType?: AssetType
  ipfsHash?: string
}

export const DefaultAsset = {
  assetId: uuid.v4(),
  assetURL: '',
  assetType: AssetType.IMAGE,
  visibility: true,
  processed: 0,
  creatorAddress: '',
  creatorId: '',
}
