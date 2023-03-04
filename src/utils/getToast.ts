import Toast from 'react-native-toast-message'

export default function getToast() {
  const showErrorToast = (text: string, bottomOffset: number | null) => {
    Toast.show({
      type: 'error',
      props: { content: text },
      position: 'bottom',
      bottomOffset: bottomOffset ? bottomOffset : 60,
      keyboardOffset: 80,
      visibilityTime: 2000,
    })
  }
  const showSuccessToast = (text: string) => {
    Toast.show({
      type: 'success',
      props: { content: text },
      position: 'bottom',
      bottomOffset: 60,
      visibilityTime: 2000,
    })
  }

  return {
    showErrorToast,
    showSuccessToast,
  }
}
