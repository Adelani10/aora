import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./customButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center  px-4">
      <View>
        <Image
          source={images.empty}
          resizeMode="contain"
          className="w-36 h-36"
        />
      </View>
      <Text className="text-white text-3xl">{title}</Text>
      <Text className="text-white text-xl">{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        otherStyles="mt-8"
        handlePress={() => {
          router.push("/home");
        }}
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
