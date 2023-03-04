import Config from 'react-native-config'
import { instance } from './requester'

export async function queryAssetsByNFTId(
  nftId: string,
  params: { userId: string; creatorAddress: string; walletAddress: string },
) {
  try {
    const { data } = await instance.get(
      `query_assets_by_nft_id/${nftId}?API_KEY=${Config.API_KEY}`,
      {
        params: {
          QUERY_PARAMS: JSON.stringify(params),
        },
      },
    )
    if (data.success) {
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryAssetsByNFTId: ', err)
    throw Error()
  }
}
