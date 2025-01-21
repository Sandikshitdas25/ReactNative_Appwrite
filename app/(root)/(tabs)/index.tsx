import { Image, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { FlatList } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";


export default function Index() {

  const { user } = useGlobalContext()

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={(item) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 my-3"
        
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
              <FlatList
                  data={[1,2,3,4]}
                  renderItem={(item) => <FeaturedCard/>}
                  horizontal
                  keyExtractor={(item) => item.toString()}
                  contentContainerClassName="flex gap-5 mt-5"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
              />
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
