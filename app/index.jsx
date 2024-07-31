import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import CustomButton from "../components/customButton";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/globalProvider";

const Index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

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

          <View className="items-center justify-center gap-y-2 my-2">
            <View className="relative">
              <Text className="text-4xl font-semibold relative text-center text-white">
                Discover Endless Possibilities with{" "}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
              <Image
                source={images.path}
                className="absolute right-0 bottom-0 w-16 h-2 "
                resizeMode=""
              />
            </View>

            <Text className="text-sm text-center text-gray-100">
              Where creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
          </View>

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
