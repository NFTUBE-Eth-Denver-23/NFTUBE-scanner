import { FeedNFT } from '../types/FeedNFT'
import { Response } from './Response'
import { instance } from './requester'

export async function fetchNewsFeed(category: string) {
  try {
    const res = await instance.get<Response<FeedNFT[]>>(
      `/query_contents/${category}`,
    )
    return res.data.data
  } catch (e) {
    console.error(JSON.stringify(e.response))
    throw e
  }
}
