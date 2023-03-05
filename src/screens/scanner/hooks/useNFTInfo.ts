import { fetchNFTInfo } from '@/api/fetchNFTInfo'
import { useQuery } from 'react-query'

export function useNFTInfo(dotId: string) {
  return useQuery(['nft-info', dotId], () => fetchNFTInfo(dotId))
}
