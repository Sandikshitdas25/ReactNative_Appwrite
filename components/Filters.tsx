import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data'

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All")
    const handleCategoryPress = (category: string) => {
        if(selectedCategory === category){
            setSelectedCategory("All")
            router.setParams({filter: ""})
            // console.log(category)
            return
        }
        setSelectedCategory(category)
        router.setParams({filter: category})
        // console.log(category)
    }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item.category)} key={index} className={`flex flex-col items-start px-5 py-2 rounded-full mr-3 ${selectedCategory === item.category ? "bg-primary-300 ": "bg-primary-100 border border-primary-200"}`}>
                <Text className={`${selectedCategory === item.category ? "text-white font-rubik-bold": "text-black-300 font-rubik"}`}>{item.title}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default Filters