import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { ReactNode } from 'react'

import { Spacing } from './Spacing'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { navigateGoBack } from '@/navigators/utils'
import { useTheme } from '@/hooks'

interface Props {
  back?: boolean | 'x'
  onPressBack?: Function
  title?: ReactNode
  right?: ReactNode[] | ReactNode
  left?: ReactNode
}

const StatusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight

export function AppHeader({ back, title, right, left, onPressBack }: Props) {
  const { Images } = useTheme()
  return (
    <View style={styles.container}>
      {back !== false && (
        <Pressable
          hitSlop={30}
          onPress={onPressBack ? onPressBack : navigateGoBack}
        >
          <Images.arrowLeft width={25} height={25} />
        </Pressable>
      )}
      {left && left}
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}
      {right ? right : <View style={{ width: 25, height: 25 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100000,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height:
      Platform.OS === 'ios' ? StatusBarHeight && StatusBarHeight + 56 : 56,
    paddingTop: Platform.OS === 'ios' ? StatusBarHeight : 0,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    color: '#000',
    fontFamily: 'Urbanist-Bold',
  },
})
