import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "../components/customButton";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/globalProvider";

const Index = () => {
  const {isLoading, isLoggedIn} = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[35vh]"
            resizeMode="contain"
          />

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#CDCDE0" style="light" />
    </SafeAreaView>
  );
};

export default Index;
