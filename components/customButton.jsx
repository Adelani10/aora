import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

const CustomButton = ({ title, handlePress, otherStyles, isLoading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      className={`bg-secondary ${otherStyles} justify-center flex items-center h-16 text-black-100 w-full mt-7 rounded-lg border`}
    >
      <Text className=" font-bold first-letter text-2xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
