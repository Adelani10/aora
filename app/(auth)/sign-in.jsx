import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React from "react";
import FormField from "../../components/formField";
import { images } from "../../constants";
import { useState } from "react";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <Text className="text-white text-3xl">Sign in</Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            keyboardType={1}
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            keyboardType={1}
          />

          <CustomButton
            title="Log In"
            handlePress={submit}
            otherStyles=" "
            isLoading={isSubmitting}
          />

          <Text className="text-xl text-center text-gray-100">
            Don't have an account?{" "}
            <Link className="text-secondary-200" href="/sign-up">
              Signup
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
