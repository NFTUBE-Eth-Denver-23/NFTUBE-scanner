import { Image, View } from 'react-native'

import React from 'react'
import { useTheme } from '@/hooks'

type Props = {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const Logo = ({ height, width, mode }: Props) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

Logo.defaultProps = {
  height: 200,
  width: 200,
  mode: 'contain',
}

export default Logo
