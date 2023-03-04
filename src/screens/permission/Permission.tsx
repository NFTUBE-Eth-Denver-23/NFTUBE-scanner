import { PERMISSIONS, requestMultiple } from 'react-native-permissions'
import { Platform, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import LottieView from 'lottie-react-native'
import { navigateAndSimpleReset } from '@/navigators/utils'
import { useTheme } from '@/hooks'

const Permission = () => {
  const { Layout } = useTheme()
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(statuses => {
        if (
          statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted' &&
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
        ) {
          // navigateAndSimpleReset('SignIn')
          setTimeout(() => {
            navigateAndSimpleReset('Scanner')
          }, 4000)
        }
      })
    } else {
      setTimeout(() => {
        navigateAndSimpleReset('Scanner')
      }, 4000)
    }
  }, [])

  return (
    <View style={Layout.fill}>
      <View
        style={[
          Layout.fill,
          Layout.center,
          { ...StyleSheet.absoluteFillObject, zIndex: 1000 },
        ]}
      >
        <LottieView
          style={{
            height: 100,
          }}
          source={require('@/assets/animations/loadingGray.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default Permission
