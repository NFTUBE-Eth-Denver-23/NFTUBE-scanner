import { Collection } from '@/types/Collection'
import { Response } from './Response'
import { instance } from './requester'

export async function fetchCollection(
  collectionId: string,
): Promise<Collection> {
  try {
    const res = await instance.get<Response<any>>(
      `query_collection/${collectionId}`,
    )
    return res.data.data
  } catch (e) {
    console.error(JSON.stringify(e.response))
    throw e
  }
}
