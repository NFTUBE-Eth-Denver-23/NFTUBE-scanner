import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { useTheme } from '@/hooks'

interface Props {
  props: any
}

const ErrorToast = ({ props }: Props) => {
  const { Images } = useTheme()

  return (
    <View style={[styles.container]}>
      <Images.ethLogo width={13} height={13} style={[styles.errorIcon]} />
      <View style={[styles.textView]}>
        <Text style={[styles.text]}>{props.content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF0F0',
    borderRadius: 5,
    height: 40,
    width: '92%',
  },
  errorIcon: {},
  textView: {
    marginLeft: 10,
  },
  text: {
    color: '#EE2D45',
  },
})

export default ErrorToast
