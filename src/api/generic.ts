import { Asset } from 'types/Asset'
import Config from 'react-native-config'
import { instance } from './requester'

export async function queryExternalImgMetadata(endpoint: string) {
  try {
    const { data } = await instance.get(
      `fetch_external_img_metadata/?ENDPOINT=${endpoint}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryExternalImgMetadata: ', err)
  }
}

export async function createPresignedURL({
  userId,
  assets,
}: {
  userId: string
  assets: Array<Asset>
}) {
  try {
    const { data } = await instance.post(
      `create_pre_signed_url?API_KEY=${Config.API_KEY}`,
      {
        data: {
          userId,
          assets,
        },
      },
    )

    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed createPresignedURL: ', err)
    throw Error()
  }
}
