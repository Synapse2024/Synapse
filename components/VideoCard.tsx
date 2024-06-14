import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react';
import { icons } from '../constants';
import { Video as ExpoVideo, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';

interface VideoData {
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

interface VideoCardProps {
  video: VideoData;
}

const isYouTubeUrl = (url: string) => {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
};

const VideoCard: React.FC<VideoCardProps> = ({ video: { title, thumbnail, video, creator: { username, avatar }}}) => {
  const [play, setPlay] = useState(false);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
      setPlay(false);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image 
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode='cover'
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image 
            source={icons.menu} 
            className="w-5 h-5"
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        isYouTubeUrl(video) ? (
          <View className="w-full h-60 rounded-xl mt-3 overflow-hidden">
            <WebView 
              source={{ uri: video }}
              style={{ width: '100%', height: '100%' }}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
        ) : (
          <ExpoVideo 
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        )
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default VideoCard;
