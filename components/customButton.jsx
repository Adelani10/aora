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
      className={`bg-secondary ${otherStyles} justify-center flex items-center h-14 w-full mt-7 rounded-lg border`}
    >
      <Text className=" font-semibold text-black-100 first-letter text-2xl">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
