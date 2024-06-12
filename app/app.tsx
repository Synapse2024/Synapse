import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';

import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

import useGlobalStore from '../hooks/useGlobalStore';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalStore();

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 16 }}>
            <Image
              source={images.altLogo}
              style={{ width: 230, height: 148, marginTop: 20 }} // Minimized logo size
              resizeMode="contain"
            />

            <Video
              source={require('../assets/video/tech_welcome.mp4')} // Local video file
              style={{ width: '90%', height: 160, marginTop: 0 }} // Minimized video size with reduced marginTop
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
            />

            <View style={{ position: 'relative', marginTop: 20 }}>
              <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Discover Endless Possibilities with 
                <Text style={{ color: '#FFA001' }}> Synapse </Text>
              </Text>
              <Image
                source={images.path}
                style={{ width: 136, height: 15, position: 'absolute', bottom: -8, right: -8 }}
                resizeMode="contain"
              />
            </View>
            
            <Text style={{ fontSize: 14, color: '#D1D1D1', marginTop: 20, textAlign: 'center' }}>
              Where creativity meets innovation: embark on a journey of limitless exploration with Synapse
            </Text>
            
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-7" textStyles={undefined} isLoading={undefined}          />
          </View>
        </ScrollView>

        <StatusBar backgroundColor='#161622'
        style='light'/>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
