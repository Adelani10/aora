import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/searchInput";
import Trending from "../../components/trending";
import EmptyState from "../../components/emptyState";

const Home = () => {
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState("")

  const search = async () => {};


  const onRefresh = async () => {
    setRefreshing(true)
// Refresh to see if there's a new vid
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full w-full border ">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={() => {}}
        ListHeaderComponent={() => {
          return (
            <View className="p-4">
              <View className="flex flex-row justify-between items-center ">
                <View className="flex items-start">
                  <Text className="text-lg font-semibold text-gray-100">
                    Welcome Back,
                  </Text>
                  <Text className="text-4xl font-semibold text-white">
                    delani
                  </Text>
                </View>

                <Image
                  source={images.logoSmall}
                  className="w-16 h-16"
                  resizeMode="contain"
                />
              </View>

              <SearchInput
                title="search videos"
                value={value}
                handleChangeText={(e) => setValue(e)}
                placeholder="Search for a video topic"
                handlePress={search}
              />

              <Trending posts={ []} />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState title="Empty" subtitle="This state is empty." />
          )
        }}
        // horizontal
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
