import Config from 'react-native-config'
import { getChain } from '@/utils/getChain'
import { instance } from './requester'

export async function queryWalletsByUserIdAndChain({
  userId,
  chainId,
}: {
  userId: string
  chainId: number
}) {
  try {
    const { data } = await instance.get(
      `query_wallets_by_user_id_and_chain/${userId}/${
        getChain(chainId).chainTag
      }`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryWalletsByUserIdAndChain: ', err)
    throw Error()
  }
}

export async function queryWalletByUserIdAndChain({
  userId,
  chainId,
}: {
  userId: string
  chainId: number
}) {
  try {
    const { data } = await instance.get(
      `query_recent_wallet_by_user_id_and_chain/${userId}/${
        getChain(chainId).chainTag
      }?API_KEY${Config.API_KEY}`,
    )

    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryWalletByUserIdAndChain: ', err)
    throw Error()
  }
}

export async function saveWallet({
  address,
  chainId,
  userId,
  signature,
}: {
  address: string
  chainId: number
  userId: string
  signature: string
}) {
  try {
    const { data } = await instance.post(
      `save_wallet?API_KEY${Config.API_KEY}`,
      {
        data: {
          address,
          chain: getChain(chainId).chainTag,
          userId,
          signature,
        },
      },
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed saveWallet: ', err)
    throw Error()
  }
}
