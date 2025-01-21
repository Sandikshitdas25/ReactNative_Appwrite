import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'

interface Props {
    onPress?: () => void
}

export const FeaturedCard = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={images.japan} className='size-full rounded-2xl'/>
        <Image source={images.cardGradient} className='size-full absolute rounded-2xl bottom-0'/>
        <View className='flex flex-row items-center gap-1 justify-center absolute right-5 top-4 bg-white px-2 py-1 rounded-full'>
            <Image source={icons.star} className='size-3.5'/>
            <Text className='text-xs font-rubik-semibold text-primary-300'>4.5</Text>
        </View>
        <View className='absolute bottom-5 flex justify-center items-start inset-x-5 '>
            <Text className='text-base font-rubik-extrabold text-white' numberOfLines={1}>Modern Apartment</Text>
            <Text className='text-base font-rubik text-white'>22 W 15th St, New York</Text>
            <View className='flex flex-row justify-between w-full items-center'>
                <Text className='text-white font-extrabold text-xl'>$2500</Text>
                <Image source={icons.heart} className='size-5'/>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export const Card = ({onPress}: Props) => {
  return (
    <TouchableOpacity className='flex-1 w-full shadow-black-100/70 bg-white px-3 py-4 shadow-2xl shax rounded-lg ' onPress={onPress}>
        <View className='flex flex-row items-center gap-1 justify-center absolute right-5 top-7 bg-white px-2 py-1 rounded-full z-10'>
            <Image source={icons.star} className='size-2.5'/>
            <Text className='text-xs font-rubik-semibold text-primary-300'>4.5</Text>
        </View>
        <Image source={images.newYork} className='w-full h-40 rounded-lg'/>
        <View className='flex justify-center items-start'>
            <Text className='text-base font-rubik-extrabold text-black-300' >Cozy studio</Text>
            <Text className='text-base font-rubik text-black-300'>22 W 15th St, New York</Text>
            <View className='flex flex-row justify-between w-full items-center'>
                <Text className=' font-extrabold text-xl text-primary-300'>$900</Text>
                <Image source={icons.heart} className='size-5' tintColor={"#191D31"}/>
            </View>
        </View>
    </TouchableOpacity>
  )
}
