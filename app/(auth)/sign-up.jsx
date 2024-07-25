import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import FormField from "../../components/formField";
import { images } from "../../constants";
import { useState } from "react";
import CustomButton from "../../components/customButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [value, setValue] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {};
  return (
    <SafeAreaView className="bg-primary h-full justify-center items-start">
      <ScrollView className="w-full">
        <View className="p-4 py-12 w-full space-y-6 h-full">
          <View className="space-y-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Text className="text-white text-3xl">Sign up</Text>
          </View>

          <FormField
            title="Username"
            value={value.username}
            handleChangeText={(e) =>
              setValue({
                ...value,
                username: e,
              })
            }
            keyboardType={1}
          />

          <FormField
            title="Email"
            value={value.email}
            handleChangeText={(e) =>
              setValue({
                ...value,
                email: e,
              })
            }
            keyboardType={1}
          />

          <FormField
            title="Password"
            value={value.password}
            handleChangeText={(e) =>
              setValue({
                ...value,
                password: e,
              })
            }
            keyboardType={1}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            otherStyles=""
            isLoading={isSubmitting}
          />

          <Text className="text-xl text-center text-gray-100">
            Already have an account? <Link className="text-secondary-200" href="/sign-in">Login</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
