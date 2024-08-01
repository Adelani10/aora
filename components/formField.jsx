import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { images, icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-2 w-full mb-2  mt-6">
      <Text className="text-gray-100 text-xl">{title}</Text>

      <View className="relative flex justify-center h-14">
        <TextInput
          className="h-full focus:border-secondary-100 focus:border text-white text-lg bg-black-200 px-3 rounded-lg w-full"
          value={value}
          placeholder={placeholder}
          TextColor="#7B7B8B"
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute self-end bottom-0 "
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
