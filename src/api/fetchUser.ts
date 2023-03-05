import { Response } from './Response'
import { User } from '@/types/User'
import { instance } from './requester'

export async function fetchUser(user: {
  address: string
  chain: string
}): Promise<User> {
  try {
    const res = await instance.get<Response<any>>(
      `query_user_by_wallet_address/${user.address}/${user.chain}`,
    )
    return res.data.data
  } catch (e) {
    console.error('eroror', JSON.stringify(e.response))
    throw e
  }
}
