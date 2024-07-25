import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { images, icons } from "../constants";

const FormField = ({ title, value, handleChangeText, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-2 w-full mb-2  mt-6">
      <Text className="text-gray-100 text-2xl">{title}</Text>

      <View className="relative flex justify-center h-14">
        <TextInput
          className="h-full focus:border-secondary-100 focus:border text-white text-2xl px-3 rounded-lg w-full bg-black-200"
          value={value}
          placeholder="Enter your email"
          TextColor="#f5f5f5"
          onChangeText={handleChangeText}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute self-end bottom-3 "
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className=" h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
