import {
  Platform,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'
import React, { useEffect, useRef } from 'react'

const createFragment = (viewId: number | null) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.RNScannerView.Commands.create.toString(),
    [viewId],
  )

export const ScannerView = (props: any) => {
  const ref = useRef(null)

  useEffect(() => {
    if (Platform.OS === 'android') {
      const viewId = findNodeHandle(ref.current)

      createFragment(viewId)
    }
  }, [])

  return <RNScannerView {...props} ref={ref} />
}

var RNScannerView = requireNativeComponent('RNScannerView')
