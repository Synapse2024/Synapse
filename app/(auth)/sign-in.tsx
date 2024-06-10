import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

import { images } from '../../constants';
import FormField from '@/components/FormField';

const SignIn = () => {
  const [form, setForm] = useState ({
    email: '',
    password: '',
  })

  const handleChangeText = (key: string) => (text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: text,
    }));
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.altLogo}
            resizeMode='contain' className="w-[115px] h-[90px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log into Synapse</Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={handleChangeText('email')}
            otherStyles=""
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={handleChangeText('password')}
            otherStyles=""
            secureTextEntry
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn