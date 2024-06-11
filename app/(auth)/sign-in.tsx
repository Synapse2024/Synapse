import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn } from '@/lib/appwrite';
import { getCurrentUser } from '@/lib/appwrite';
import useGlobalStore from '../../hooks/useGlobalStore';

const SignIn = () => {
  const [form, setForm] = useState ({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setUser, setIsLoggedIn } = useGlobalStore();

  const handleChangeText = (key: string) => (text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: text,
    }));
  };

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);
    try {
        await signIn(form.email, form.password);
        
        // set it to global state..,
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
        Alert.alert("Success", "User signed in successfully");
        router.replace('/home')
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            Alert.alert('Error', error.message || 'Unknown error occurred');
        } else {
            Alert.alert('Error', 'Unknown error occurred');
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.altLogo}
            resizeMode='contain' className="w-[115px] h-[90px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log into Synapse</Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={handleChangeText('email')}
            otherStyles=""
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={handleChangeText('password')}
            otherStyles=""
            secureTextEntry
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn