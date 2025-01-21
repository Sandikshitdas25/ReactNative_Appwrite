import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'

const Sign_in = () => {

  const {refetch, loading, isLoggedin} = useGlobalContext();
  if(!loading && isLoggedin) return <Redirect href={"/"}/>


  const handleLogin = async () => {
    const result = await login()

    if(result) {
      console.log("login success")
      refetch();
    }else {
      Alert.alert("error", "failed to login")
    }
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <Image source={images.onboarding} className='w-full h-[500px]' resizeMode='contain'/>
        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to ReState</Text>
          <Text className='text-2xl font-rubik-bold text-black-300 text-center'>Let's Get You Closer to {"\n"}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>
          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Login to ReState with Google</Text>
          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 w-full py-4 mt-5 rounded-full px-3'>
            
              <View className='flex flex-row items-center justify-center'>
                <Image 
                  source={icons.google}
                  className='w-5 h-5'
                  resizeMode='contain'
                />
                <Text className='text-lg font-rubik-semibold text-black-300 ml-2 '>Continue with Google </Text>
              </View>
               
          </TouchableOpacity>
        </View>
      </ScrollView>
        
      
    </SafeAreaView>
  )
}

export default Sign_in