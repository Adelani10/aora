import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn = { 0: { scale: 0.9 }, 1: { scale: 1.1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.9 } };

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className=""
      animation={activeItem === item ? zoomIn : zoomOut}
      duration={500}
    >
      {play === false ? (
        <TouchableOpacity
          className="h-64 w-40 rounded-2xl bg-gray-100 border flex justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="h-full w-full overflow-hidden rounded-xl"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-8 absolute h-8"
          />
        </TouchableOpacity>
      ) : (
        <Video
          source={{ uri: item.video }}
          className="rounded-lg"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

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
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170 }}
      />
    </View>
  );
};

export default Trending;
