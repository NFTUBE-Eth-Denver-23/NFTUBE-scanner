import * as React from 'react'

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'

import { useTheme } from '@/hooks'
import { withProps } from '@/hocs/withProps'

interface ScreenProps extends React.ComponentProps<typeof SafeAreaView> {
  backgroundColor?: string | false
  statusBarStyle?: 'default' | 'light-content' | 'dark-content'
  keyboard?: boolean
}

export const Screen: React.FC<ScreenProps> = props => {
  const { Layout } = useTheme()

  const Wrapper =
    props.keyboard !== false && Platform.OS === 'ios'
      ? IosKeyboardAvoidingView
      : React.Fragment

  return (
    <Wrapper>
      <View
        {...props}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss()
          return false
        }}
        style={[Layout.fill, props.style]}
      />
    </Wrapper>
  )
}

export default Screen

const IosKeyboardAvoidingView = withProps(KeyboardAvoidingView, {
  behavior: 'padding',
  style: { flex: 1 },
})
