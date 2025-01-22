import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'

const TabIcon = ({icon, focused, title}: { icon: any; focused : boolean;title: string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center justify-center'>
        <Image source={icon} tintColor={focused? "#0061FF": "#666876"} resizeMode='contain' className='size-8'/>
        <Text className={`${focused ? "text-primary-300 font-rubik-medium" : "font-rubik-medium text-[#666876]"} text-xs w-full mt-1 text-center`}>{title}</Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "white",
                position: 'absolute',
                borderTopColor: "#0061FF1A",
                borderWidth: 1,
                minHeight: 70,
                
            }
        }}>
            <Tabs.Screen 
                name='index'
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            icon={icons.home}
                            focused={focused}
                            title='Home'
                        />
                        
                    )
                }}
            />

            <Tabs.Screen 
                name='Explore'
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            icon={icons.search}
                            focused={focused}
                            title='Explore'
                        />
                        
                    )
                }}
            />

            <Tabs.Screen 
                name='Profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon
                            icon={icons.person}
                            focused={focused}
                            title='Profile'
                        />
                        
                    )
                }}
            />
            
    </Tabs>
  )
}

export default TabsLayout