import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { Button } from 'react-native-paper'

interface ICTAButton {
  label: number | string
  onPress: () => void
  mode: 'text' | 'outlined' | 'contained'
  textColor: string
  buttonColor: string
  style: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  icon?: ReactNode
  disabled?: boolean
}

const CTAButton = ({
  label,
  onPress,
  mode,
  textColor,
  buttonColor,
  contentStyle,
  labelStyle,
  style,
  icon,
  disabled,
}: ICTAButton) => {
  return (
    <Button
      icon={() => icon}
      mode={mode}
      textColor={textColor}
      buttonColor={buttonColor}
      onPress={() => onPress()}
      contentStyle={contentStyle}
      labelStyle={labelStyle}
      style={style}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}

CTAButton.defaultProps = {
  icon: null,
  disabled: false,
}

export default CTAButton
