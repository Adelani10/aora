import { FlatList } from "react-native";
import { useAppwrite } from "../../lib/useAppwrite";
import EmptyState from "../../components/emptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import InfoBox from "../../components/infoBox";
import VideoCard from "../../components/videoCard";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full">
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
          return <InfoBox handlePress={logOut} />;
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos have been created yet!"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
