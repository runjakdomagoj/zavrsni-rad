import React from 'react'
import { View } from 'react-native'
import TitleButton from '../components/TitleButton'

const IntroScreen = ({navigation}) => {
  return (
    <View className="bg-white flex-1 justify-center items-center p-4">
    <TitleButton
      buttonTitle="Započni put kroz Hrvatsku"
      navigationTitle="Povijest Hrvatske"
      navigation={navigation}
    />
  </View>
  )
}

export default IntroScreen