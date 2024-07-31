import { View, Text, SafeAreaView, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppwrite } from "../../lib/useAppwrite";
import { StatusBar } from "expo-status-bar";
import EmptyState from "../../components/emptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import InfoBox from "../../components/infoBox";
import VideoCard from "../../components/videoCard";
import { router } from "expo-router";

const Profile = () => {
  const [refreshing, setRefreshing] = useState("");
  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));


  useEffect(() => {
    refetch();
  }, []);

  const logOut = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  }

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
            <InfoBox handlePress={logOut}  />
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

      <StatusBar />
    </SafeAreaView>
  );
};

export default Profile;
