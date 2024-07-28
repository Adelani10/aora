import { View, Text, FlatList } from "react-native";
import React from "react";
import EmptyState from "./emptyState";

const Trending = ({posts}) => {
  return (
    <View className="mt-6">
      <View>
        <Text className="text-gray-100 capitalize text-sm">
          trending videos
        </Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={(item) => (
          <View className="mt-4">
            <View className="h-40 w-28 mr-2 rounded-lg bg-gray-100 border"></View>
            <Text className="text-white">{item.item}</Text>
          </View>
        )}
        ListEmptyComponent={() => {
          
        }}
        horizontal
      />
    </View>
  );
};

export default Trending;
