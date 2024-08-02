import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import FormField from "../../components/formField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/customButton";
import * as ImagePicker from "expo-image-picker";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const { user } = useGlobalContext();

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }
      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.video || !form.title || !form.thumbnail) {
      return Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="p-4">
          <View className="mt-3 mb-2">
            <Text className="text-white font-bold text-2xl">Upload Video</Text>
          </View>

          <FormField
            title="Video Title"
            value={form.title}
            placeholder="Give your video a catchy title..."
            handleChangeText={(e) =>
              setForm({
                ...form,
                title: e,
              })
            }
          />
          <View className="gap-y-2 mt-2 mb-3">
            <Text className="text-gray-100 text-xl">Upload Video</Text>

            <View className="relative bg-black-200 rounded-xl flex justify-center items-center h-52">
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-full rounded-lg"
                  resizeMode={ResizeMode.COVER}
                  // shouldPlay
                />
              ) : (
                <TouchableOpacity
                  onPress={() => openPicker("video")}
                  className="border border-dashed border-secondary rounded-lg p-3"
                >
                  <Image
                    className=" w-8 h-8 "
                    source={icons.upload}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="gap-y-2">
            <Text className="text-gray-100 text-xl">Upload Thumbnail</Text>

            <View className="relative bg-black-200 rounded-xl flex justify-center items-center h-36">
              {form.thumbnail ? (
                <Image
                  source={form.thumbnail}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => openPicker("image")}
                  className="flex flex-row items-center gap-x-1"
                >
                  <Image
                    className=" w-6 h-8 "
                    source={icons.upload}
                    resizeMode="contain"
                  />
                  <Text className="text-lg text-gray-100">Choose a file</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The AI prompt of your video..."
            handleChangeText={(e) =>
              setForm({
                ...form,
                prompt: e,
              })
            }
          />

          <CustomButton
            title="Submit & Publish"
            handlePress={submit}
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
