import { NFT } from '@/types/NFT'
import { Response } from './Response'
import { instance } from './requester'

export async function fetchNFTInfo(dotId: string): Promise<NFT> {
  try {
    const res = await instance.get<Response<any>>(
      `query_nft_by_dot_id/${dotId}`,
    )
    return res.data.data
  } catch (e) {
    console.error(JSON.stringify(e.response))
    throw e
  }
}
