import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import { MainScreen } from '@/screens/main'
import { ProfileScreen } from '@/screens/profile'
import { ScannerScreen } from '@/screens/scanner'
import { SettingsScreen } from '@/screens/settings'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@/hooks'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const { Images } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 90,
          borderTopLeftRadius: 16,
          borderWidth: 1,
          borderColor: '#F1F1F1',
          borderTopRightRadius: 16,
          backgroundColor: '#ffffff',
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Explore"
        component={MainScreen}
        options={{
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Images.home width={22} height={22} stroke={'#9E9E9E'} />
              <Text
                style={{
                  fontSize: 10,
                  color: '#9E9E9E',
                  lineHeight: 14,
                  marginTop: 2,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: '#00DF8F',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Images.scan width={22} height={22} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Images.profile width={22} height={22} stroke={'#9E9E9E'} />
              <Text
                style={{
                  fontSize: 10,
                  color: '#9E9E9E',
                  lineHeight: 14,
                  marginTop: 2,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
