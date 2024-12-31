import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from '../(auth)/login'

type Props = {}

const ProfileScreen = (props: Props) => {
  return (
    <View className="w-full h-full flex items-center justify-center">
      <LoginScreen />
    </View>
  )
}

export default ProfileScreen
