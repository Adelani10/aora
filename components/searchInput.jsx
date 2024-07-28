import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  handlePress,
  ...props
}) => {
  return (
    <View className="space-y-2 w-full mt-8">
      <View className="relative flex justify-center h-14">
        <TextInput
          className="h-full placeholder-white focus:border-secondary-100 focus:border text-white text-lg px-3 rounded-lg w-full bg-black-200"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#f5f5f5"
          place
          TextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        <TouchableOpacity
          onPress={handlePress}
          className="absolute self-end "
        >
          <Image
            source={icons.search}
            className=" h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
