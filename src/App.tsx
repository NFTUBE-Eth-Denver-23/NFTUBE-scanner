import 'react-native-gesture-handler'
import './translations'

import { Linking, Platform } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { useEffect } from 'react'
import { persistor, store } from '@/store'

import { Amplify } from 'aws-amplify'
import ApplicationNavigator from '@/navigators/Application'
import GlobalModal from './components/modal/GlobalModal'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import awsconfig from './aws-exports'

async function urlOpener(url: string | string[], redirectUrl: string) {
  if (await InAppBrowser.isAvailable()) {
    if (!url.includes('logout')) {
      const { type, url: newUrl } = await InAppBrowser.openAuth(
        url,
        redirectUrl,
        {
          modalEnabled: false,
          showTitle: false,
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          ephemeralWebSession: false,
        },
      )
      if (type === 'success') {
        Linking.openURL(newUrl)
      }
    }
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
})

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnReconnect: true, refetchOnMount: true },
  },
})

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <SafeAreaProvider>
            <GlobalModal />
            <ApplicationNavigator />
          </SafeAreaProvider>
        </Provider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
