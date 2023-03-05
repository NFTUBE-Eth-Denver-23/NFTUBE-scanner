import { Dimensions, Platform } from 'react-native'
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const FIGMA_WINDOW_WIDTH = 375
const FIGMA_WINDOW_HEIGHT = 812

export default function getSize() {
  function widthPercentage(width: number): number {
    const percentage = (width / FIGMA_WINDOW_WIDTH) * 100

    return responsiveScreenWidth(percentage)
  }

  function heightPercentage(height: number): number {
    const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100

    return responsiveScreenHeight(percentage)
  }

  function fontPercentage(size: number): number {
    const percentage = size * 0.135

    return responsiveScreenFontSize(percentage)
  }

  function androidCheckHeight(): number {
    const height = Dimensions.get('window').height
    let checkHeight = 0
    if (height > 730) {
      // 노트 20
      checkHeight = 1
    } else if (height > 700 && height < 730) {
      // s21
      checkHeight = 2
    } else if (height < 700) {
      // s8
      checkHeight = 3
    }

    return checkHeight
  }

  function getKeyboardVerticalOffset(): number {
    const more = Platform.OS === 'ios' ? 0 : -13
    return heightPercentage(getStatusBarHeight() + more)
  }

  return {
    widthPercentage,
    heightPercentage,
    fontPercentage,
    androidCheckHeight,
    getKeyboardVerticalOffset,
  }
}
