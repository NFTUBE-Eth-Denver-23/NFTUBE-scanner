import Config from 'react-native-config'
import { User } from '@/types/User'
import axios from 'axios'
import { instance } from './requester'

export async function saveUser({ user }: { user: User }) {
  try {
    const { data } = await instance.post(
      `save_user?API_KEY=${Config.API_KEY}`,
      {
        data: user,
      },
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed saveUser: ', err)
    throw Error()
  }
}

export async function queryUserByAddress({
  address,
  chain,
}: {
  address: string
  chain: string
}) {
  try {
    const { data } = await instance.get(
      `query_user_by_wallet_address/${address}/${chain}?API_KEY=${Config.API_KEY}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error(data.message)
    }
  } catch (err) {
    console.log('failed queryUserByAddress: ', err)
    throw Error()
  }
}

export async function queryUserById(userId: string) {
  try {
    const { data } = await instance.get(
      `query_user/${userId}?API_KEY=${Config.API_KEY}`,
    )
    if (data.success) {
      data.data.socialLinks = JSON.parse(data.data.socialLinks)
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryUserById: ', err)
    throw Error()
  }
}

export async function queryUserByTag(tag: string) {
  try {
    const { data } = await instance.get(
      `query_user_by_tag/${tag}?API_KEY=${Config.API_KEY}`,
    )
    if (data.success) {
      return data.data
    } else {
      throw Error('server message error')
    }
  } catch (err) {
    console.log('failed queryUserByTag: ', err)
    throw Error()
  }
}
