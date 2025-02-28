import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({ title, thumbnail, video, creator, avatar }) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="mb-6 w-full gap-y-4 px-4">
      <View className="flex w-full flex-row justify-between items-start">
        <View className="flex flex-row gap-x-2 ">
          <View className="border border-secondary-100 h-12 rounded-lg w-12">
            <Image
              source={{ uri: avatar }}
              className="h-full rounded-lg w-full"
              resizeMode="contain"
            />
          </View>

          <View className="gap-y-1">
            <Text className="text-lg font-semibold text-white">{title}</Text>
            <Text className="text-sm capitalize text-gray-100">{creator}</Text>
          </View>
        </View>

        <View className="w-4 h-4">
          <Image
            source={icons.menu}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="rounded-lg w-full border h-56"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => console.log(error)}
        />
      ) : (
        <View className="w-full flex justify-center items-center rounded-xl relative h-56">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl "
            resizeMode="cover"
          />

          <TouchableOpacity
            className="w-10 h-10 absolute"
            onPress={() => setPlay(true)}
          >
            <Image
              source={icons.play}
              className="rounded-xl w-full h-full "
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoCard;
