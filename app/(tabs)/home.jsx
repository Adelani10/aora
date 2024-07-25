import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList data={[]} keyExtractor={(item) => item.$id} />
    </SafeAreaView>
  );
};

export default Home;
