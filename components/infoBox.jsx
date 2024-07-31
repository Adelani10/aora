import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";

const InfoBox = ({handlePress}) => {
  return (
    <View className="mb-8 mt-2 px-4">
      <View className="flex gap-y-2 justify-center items-center ">
        <TouchableOpacity onPress={handlePress} className="self-end">
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-7 h-8"
          />
        </TouchableOpacity>

        <View className="justify-center items-center gap-y-2">
          <Image
            source={images.profile}
            resizeMode="contain"
            className="w-14 h-14 border border-secondary-100 rounded-xl"
          />
          <Text className="text-2xl font-semibold text-white">InfoBox</Text>
        </View>

        <View className="flex gap-x-5 flex-row">
          <View className="items-center">
            <Text className="text-white text-2xl font-semibold">10</Text>
            <Text className="text-gray-100 text-xs font-semibold">Posts</Text>
          </View>

          <View className="items-center">
            <Text className="text-white text-2xl font-semibold">1.2k</Text>
            <Text className="text-gray-100 text-xs font-semibold">Views</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfoBox;
