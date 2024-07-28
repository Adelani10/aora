import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";

const VideoCard = ({ title, thumbnail, video, creator, avatar }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="mb-6 w-full gap-y-4 px-4">

      <View className="flex w-full flex-row justify-between items-start">

        <View className="flex flex-row gap-x-2 ">
          <View className="border border-secondary-100 h-12 rounded-lg w-12">
            <Image source={avatar} className="h-full w-full" resizeMode="contain" />
          </View>


          <View className="gap-y-1">
            <Text className="text-lg font-semibold text-white">{title}</Text>
            <Text className="text-sm capitalize text-gray-100">{creator}</Text>
          </View>
        </View>

        <View className="w-4 h-4" >
          <Image source={icons.menu} className="w-full h-full" resizeMode="contain" />
        </View>
      </View>

      {play === false && (
        <View className="w-full border rounded-xl relative h-48">
          <Image
            source={thumbnail}
            className="w-full h-full rounded-xl "
            resizeMode="cover"
          />

          <TouchableOpacity className="w-10 h-10 inline-block translate-x-[50%] top-1/2 left-1/2  absolute" onPress={() => setPlay(true)}>
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
