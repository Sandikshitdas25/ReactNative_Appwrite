import { View, Text, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle: string;
  showArrow: boolean;

}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}: SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-7'/>
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className='size-6'/>}
  </TouchableOpacity>
)

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async() => {
    const result = await logout()
    console.log("resultInLogOut : ",result)
    
    if(result){
      Alert.alert("Success", "You have been logged out!")
      refetch(); //refetch after logout because we are re-validating the user
    }else {
      Alert.alert("Error", "An error occurred while logging out")
      
    }

  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5'/>
        </View>
 
        <View className=' flex flex-row justify-center mt-5'>
          <View className='flex flex-col justify-center items-center relative mt-5'>
            <Image source={{uri: user?.avatar}} className='size-44 relative rounded-full'/>
            <TouchableOpacity className='absolute bottom-12 right-2'>
              <Image source={icons.edit} className='size-8'/>
            </TouchableOpacity>
            <Text className='font-rubik-semibold text-2xl mt-2'>{user?.name}</Text>
          </View>
        </View>

        {/* <View>
          <SettingsItem icon={icons.calendar} title='My bookings' textStyle={''} showArrow={true}/>
          <SettingsItem icon={icons.wallet} title='Payments' textStyle={''} showArrow={true}/>
        </View> */}

        <View className='flex flex-col mt-7'>
          {settings.map((item, index) => (
            <SettingsItem textStyle={''} showArrow={true} key={index} {...item} />
          ))}
        </View>

        <View className='border-t border-primary-200 mt-5'>
          <SettingsItem icon={icons.logout} title='Logout' showArrow={false} textStyle='text-danger'onPress={handleLogout}/>
        </View>

      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Profile