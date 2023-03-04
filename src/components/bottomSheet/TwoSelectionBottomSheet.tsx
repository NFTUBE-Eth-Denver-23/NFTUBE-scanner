import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import React from 'react'
import { Spacing } from '../Spacing'
import getSize from '@/utils/getSize'
import { useTheme } from '@/hooks'

interface Props {
  modalizeRef: React.RefObject<Modalize>
  TopIcon: any
  topIconColor: string
  BottomIcon: any
  bottomIconColor: string
  topText: string
  bottomText: string
  onPressTop: () => void
  onPressBottom: () => void
}

const TwoSelectionBottomSheet = ({
  modalizeRef,
  TopIcon,
  topIconColor,
  BottomIcon,
  bottomIconColor,
  topText,
  bottomText,
  onPressTop,
  onPressBottom,
}: Props) => {
  const { Layout, Colors } = useTheme()
  const { heightPercentage, widthPercentage } = getSize()
  const onClose = () => {
    modalizeRef.current?.close()
  }

  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: 16,
      paddingVertical: 32,
    },
    pressableView: {
      alignItems: 'center',
    },
    verticalLineView: {
      marginVertical: 10,
    },
    textView: {
      marginLeft: 18,
    },
    text: {
      fontWeight: '400',
      fontSize: 16,
    },
  })

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        handlePosition={'inside'}
        adjustToContentHeight={true}
        disableScrollIfPossible={true}
      >
        <View style={[styles.wrapper]}>
          <Pressable
            style={[styles.pressableView, Layout.row]}
            onPress={onPressTop}
          >
            <TopIcon width={40} height={40} fill={topIconColor} />
            <View style={[styles.textView]}>
              <Text
                style={{
                  fontFamily: 'Urbanist',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#000000',
                }}
              >
                {topText}
              </Text>
            </View>
          </Pressable>
          <View style={[styles.verticalLineView]} />
          <Pressable
            style={[styles.pressableView, Layout.row]}
            onPress={onPressBottom}
          >
            <BottomIcon width={40} height={40} fill={bottomIconColor} />
            <View style={[styles.textView]}>
              <Text
                style={{
                  fontFamily: 'Urbanist',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#000000',
                }}
              >
                {bottomText}
              </Text>
            </View>
          </Pressable>
          <View style={{ height: 21 }} />
          <View style={{ borderColor: '#EEEEEE', borderWidth: 1 }} />
          <View style={{ height: 21 }} />
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Text
              style={{
                fontFamily: 'Urbanist',
                fontWeight: '400',
                fontSize: 14,
                color: '#808191',
              }}
            >
              New to wallets?
            </Text>
            <Spacing width={widthPercentage(8)} />
            <Pressable hitSlop={30}>
              <Text
                style={{
                  fontFamily: 'Urbanist',
                  fontWeight: '600',
                  fontSize: 14,
                  color: '#1A96F0',
                }}
              >
                Learn more
              </Text>
            </Pressable>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </Modalize>
    </Portal>
  )
}

export default TwoSelectionBottomSheet
