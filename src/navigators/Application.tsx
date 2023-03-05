import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Platform, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackParamList, navigationRef } from './utils'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { PermissionScreen } from '@/screens/permission'
import { ScannerScreen } from '@/screens/scanner'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@/hooks'

const Stack = createStackNavigator<RootStackParamList>()

const ApplicationNavigator = () => {
  const { Layout, Colors } = useTheme()
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white,
    },
  }

  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <View style={[Layout.fill, { backgroundColor: Colors.white }]}>
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
          <Host>
            <StatusBar barStyle={'dark-content'} backgroundColor={'red'} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Permission" component={PermissionScreen} />
              <Stack.Screen name="Scanner" component={ScannerScreen} />
            </Stack.Navigator>
          </Host>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  )
}

export default ApplicationNavigator
