import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { useTheme } from '@/hooks'

interface Props {
  props: any
}

const SuccessToast = ({ props }: Props) => {
  const { Colors, Images } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      backgroundColor: '#323232',
      borderRadius: 5,
      height: 40,
      width: '92%',
    },
    textView: {
      marginLeft: 10,
    },
    text: {
      fontWeight: '400',
      color: '#808191',
      fontSize: 14,
    },
  })

  return (
    <View style={[styles.container]}>
      <Images.ethLogo width={26} height={20} />
      <View style={[styles.textView]}>
        <Text style={[styles.text]}>{props.content}</Text>
      </View>
    </View>
  )
}

export default SuccessToast
