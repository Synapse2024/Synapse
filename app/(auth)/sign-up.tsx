import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Link } from 'expo-router';

import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  const [form, setForm] = useState ({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChangeText = (key: string) => (text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: text,
    }));
  };

  const submit = () => {

  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image source={images.altLogo}
            resizeMode='contain' className="w-[115px] h-[90px]" />
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                Sign up to Synapse
            </Text>
            <FormField
                title="Username"
                value={form.username}
                placeholder="Enter a username"
                handleChangeText={handleChangeText('username')}
                otherStyles=""
            />
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
                    Have an account already?
                </Text>
                <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
                    Sign in
                </Link>
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp