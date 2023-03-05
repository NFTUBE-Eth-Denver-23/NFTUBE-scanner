import { StyleSheet } from 'react-native'
import getSize from '@/utils/getSize'
import { useTheme } from '@/hooks'

export const useStyle = () => {
  const { Colors, FontSize } = useTheme()
  const { widthPercentage, heightPercentage, fontPercentage } = getSize()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      paddingVertical: 20,
    },
    profileIcon: {
      width: 48,
      height: 48,
      borderRadius: 48 / 2,
    },
    contentLine: {
      backgroundColor: '#DCDCDC',
      width: '100%',
      height: 1,
      marginVertical: 22,
    },
    tinyLogo: {
      width: widthPercentage(150),
      height: widthPercentage(150),
      borderRadius: 10,
    },
    contentHeading: {
      fontSize: 22,
      fontWeight: '700',
      color: '#000',
      letterSpacing: 0.1,
    },
    contentDescription: {
      paddingTop: 4,
      marginRight: 4,
      fontSize: 16,
      fontWeight: '400',
      color: '#000000',
      lineHeight: 22,
    },
  })

  return {
    styles,
  }
}
