import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { searchPosts } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import SearchInput from "../../components/searchInput";
import EmptyState from "../../components/emptyState";
import VideoCard from "../../components/videoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState("");
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  const search = async () => {};

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full w-full border ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item.video}
            title={item.title}
            creator={item.creator.username}
            thumbnail={item.thumbnail}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => {
          return (
            <View className="p-4">
              <View className="flex flex-row justify-between items-center ">
                <View className="flex items-start">
                  <Text className="text-lg font-semibold text-gray-100">
                    Search results,
                  </Text>
                  <Text className="text-4xl font-semibold text-white">
                    {query}
                  </Text>
                </View>
              </View>

              <SearchInput
                handleChangeText={(e) => setValue(e)}
                placeholder={query}
                // handlePress={search}
                initialQuery={query}
              />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos have been created yet!"
            />
          );
        }}
        // horizontal
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />

      {/* <StatusBar /> */}
    </SafeAreaView>
  );
};

export default Search;
