import 'react-native-gesture-handler'
import './translations'

import { QueryClient, QueryClientProvider } from 'react-query'
import React, { useEffect } from 'react'
import { persistor, store } from '@/store'

import ApplicationNavigator from '@/navigators/Application'
import GlobalModal from './components/modal/GlobalModal'
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
