import { View, Text } from "react-native";
import React from "react";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
