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
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
