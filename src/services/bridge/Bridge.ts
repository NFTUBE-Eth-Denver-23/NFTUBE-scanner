import { NativeEventEmitter, NativeModules } from 'react-native'

const _eventEmitter = new NativeEventEmitter(
  NativeModules.NativeMobileSDKBridge,
)

export const MobileSDKEvent = {
  OnDataMessageReceive: 'OnDataMessageReceive',
}

export function getSDKEventEmitter() {
  return _eventEmitter
}

export const NativeFunction = {
  sendDataMessage: NativeModules.NativeMobileSDKBridge.sendDataMessage,
}
