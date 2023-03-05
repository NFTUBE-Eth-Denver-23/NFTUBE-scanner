import {
  ChangePasswordScreen,
  CreatePasswordScreen,
  ForgetPasswordScreen,
} from '@/screens/password'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { MyProfileScreen, ProfileScreen } from '@/screens/profile'
import { Platform, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackParamList, navigationRef } from './utils'

import { AssetDetailScreen } from '@/screens/assetDetail'
import { CollectionScreen } from '@/screens/collection'
import { ConfirmEmailScreen } from '@/screens/confirmEmail'
import { EditProfileScreen } from '@/screens/editProfile'
import { EditWalletScreen } from '@/screens/editWallet'
import ErrorToast from '@/components/toast/ErrorToast'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { NftGroupScreen } from '@/screens/nft-group'
import { PermissionScreen } from '@/screens/permission'
import { ScannerDetailScreen } from '@/screens/scannerDetail'
import { ScannerScreen } from '@/screens/scanner'
import { SearchScreen } from '@/screens/search/SearchScreen'
import { SignInScreen } from '@/screens/signin'
import { SignUpScreen } from '@/screens/signup'
import SuccessToast from '@/components/toast/SuccessToast'
import Toast from 'react-native-toast-message'
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

  const toastConfig = {
    error: ({ props }: any) => <ErrorToast props={props} />,
    success: ({ props }: any) => <SuccessToast props={props} />,
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
              <Stack.Screen
                name="ScannerDetail"
                component={ScannerDetailScreen}
              />
              <Stack.Screen name="NFTGroup" component={NftGroupScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="MyProfile" component={MyProfileScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen
                name="ForgetPassword"
                component={ForgetPasswordScreen}
              />
              <Stack.Screen
                name="CreatePassword"
                component={CreatePasswordScreen}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
              />
              <Stack.Screen
                name="ConfirmEmail"
                component={ConfirmEmailScreen}
              />
              <Stack.Screen name="EditProfile" component={EditProfileScreen} />
              <Stack.Screen name="EditWallet" component={EditWalletScreen} />
              <Stack.Screen name="Collection" component={CollectionScreen} />
              <Stack.Screen name="AssetDetail" component={AssetDetailScreen} />
            </Stack.Navigator>
            <Toast config={toastConfig} />
          </Host>
        </NavigationContainer>
      </View>
    </GestureHandlerRootView>
  )
}

export default ApplicationNavigator
