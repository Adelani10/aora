import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";

const VideoCard = ({ title, thumbnail, video, creator, avatar }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="mt-6">
      <View className="flex flex-row items-start">
        <View>
          <View>
            <Image source={avatar} className="h-10 w-10" resizeMode="contain" />
          </View>
          <View>
            <Text className="text-lg text-white">{title}</Text>
            <Text className="text-sm capitalize text-gray-100">{creator}</Text>
          </View>
        </View>

        <View>
          <Image source={icons.menu} className="" resizeMode="contain" />
        </View>
      </View>

      {!play && <View className="w-full rounded-xl relative h-48">
        <Image
          source={thumbnail}
          className="w-full h-full rounded-xl "
          resizeMode="cover"
        />

        <TouchableOpacity onPress={() => setPlay(true)}>
          <Image
            source={icons.play}
            className="w-12 h-12 top-1/2 left-1/2  absolute rounded-xl "
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default VideoCard;
