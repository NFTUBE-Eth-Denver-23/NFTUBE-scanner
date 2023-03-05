import {
  PERMISSIONS,
  openSettings,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions'

import { Platform } from 'react-native'

export default function getPermission() {
  const goToSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'))
  }

  const requestPhoto = async () => {
    const result: { photo: string } = {
      photo: '',
    }
    if (Platform.OS === 'ios') {
      await requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY]).then(statuses => {
        result.photo = statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]
      })
    } else {
      await requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
        statuses => {
          result.photo = statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
        },
      )
    }

    return result
  }

  const requestNotification = () => {
    requestNotifications(['alert', 'sound', 'badge']).then(
      ({ status, settings }) => {
        console.log(status)
        console.log(settings)
      },
    )
  }

  return {
    goToSettings,
    requestPhoto,
    requestNotification,
  }
}
