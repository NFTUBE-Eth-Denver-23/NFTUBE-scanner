import { GetRecoilValue, atomFamily } from 'recoil'
import { isJson, parseJson } from '@/utils/parseJson'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const storageState = atomFamily<string | null, string>({
  key: 'storage-state',
  default: key => AsyncStorage.getItem(key),
  effects_UNSTABLE: key => [
    ({ onSet }) =>
      onSet(newValue =>
        newValue
          ? AsyncStorage.setItem(key, newValue)
          : AsyncStorage.removeItem(key),
      ),
  ],
})

export function getStorageState<T>(getter: GetRecoilValue, key: string) {
  const rawData = getter(storageState(key))
  if (rawData != null && isJson(rawData)) {
    return parseJson<T>(rawData)
  }
  return rawData as T | null
}
