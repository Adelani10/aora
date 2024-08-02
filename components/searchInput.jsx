import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";

const SearchInput = ({ initialQuery }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="space-y-2 w-full mt-8">
      <View className="relative flex justify-center h-14">
        <TextInput
          className="h-full placeholder-white focus:border-secondary-100 focus:border text-white text-lg px-3 rounded-lg w-full bg-black-200"
          value={query}
          placeholder="Search a video topic..."
          placeholderTextColor="#7B7B8B"
          TextColor="#7B7B8B"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert(
                "Missing query",
                "Please input something to search results accross database"
              );
            }
            if (pathName.startsWith("/search")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }}
          className="absolute self-end "
        >
          <Image source={icons.search} className=" h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
