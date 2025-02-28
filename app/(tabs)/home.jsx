import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/searchInput";
import Trending from "../../components/trending";
import EmptyState from "../../components/emptyState";
import { useAppwrite } from "../../lib/useAppwrite";
import VideoCard from "../../components/videoCard";
import { getLatestPosts, getAllPosts } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [refreshing, setRefreshing] = useState("");
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
                    Welcome Back,
                  </Text>
                  <Text className="text-4xl font-semibold text-white">
                    {user?.username}
                  </Text>
                </View>

                <Image
                  source={images.logoSmall}
                  className="w-14 h-14"
                  resizeMode="contain"
                />
              </View>

              <SearchInput />

              <View className="w-full flex-1">
                <Trending posts={latestPosts ?? []} />
              </View>

              <View className="w-full flex-1 pt-5">
                <Text className="text-sm font-pregular text-gray-100">
                  Latest Videos
                </Text>
              </View>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
