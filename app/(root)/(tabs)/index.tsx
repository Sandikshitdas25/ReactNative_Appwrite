import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { FlatList } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {

  const { user } = useGlobalContext()

  const params = useLocalSearchParams<{query: string; filter: string}>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties
  })

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter,
      query: params.query,
      limit: 6
    },
    skip: true
  })
  // for (let index = 0; index < properties?.length; index++) {
  //   console.log(properties?[i])
  // }

  // console.log(typeof(latestProperties))
  // console.log(latestProperties?.length)
  // if(latestProperties){
  //   for (let index = 0; index < latestProperties.length; index++) {
  //     console.log(latestProperties.map((item) => 
  //       console.log(item.$id, "\n")
  //     ))
      
  //   }
  // }

  const handleCardPress = (id: string) => router.push(`/properties/${id}`)
  useEffect(() => {
    refetch({
      filter: params.filter,
      query: params.query,
      limit: 6
    })
  },[params.filter, params.query])

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)}/>}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 my-3"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (<ActivityIndicator size={"large"} className="text-primary-300 mt-5"/>) : <NoResults/>
        }

        ListHeaderComponent={
          <View className="px-5 py-2">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-3">
                <Image source={{uri: user?.avatar}} className="size-12 rounded-full" />
                <View>
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-7" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-medium text-black-200">Featured</Text>
                <TouchableOpacity>
                  <Text className="font-rubik-medium text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>

              {
                latestPropertiesLoading ? <ActivityIndicator className="text-primary-300" size="large" /> : !latestProperties || latestProperties.length === 0 ? <NoResults/> : 
                <FlatList
                    data={latestProperties}
                    renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/> }
                    horizontal
                    keyExtractor={(item) => item.$id}
                    contentContainerClassName="flex gap-5 mt-5"
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                />
              }
            </View>

            <View className="mt-5 mb-3">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-medium text-black-200">Our Recommendation</Text>
                <TouchableOpacity>
                  <Text className="font-rubik-medium text-primary-300">See All</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Filters />

    


          </View>
        }/>

    </SafeAreaView>
  );
}
