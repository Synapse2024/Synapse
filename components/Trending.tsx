import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';

interface TrendingItemProps {
  activeItem: Post;
  item: Post;
}

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }]
  },
  1: {
    transform: [{ scale: 1.1 }]
  }
}

const zoomOut = {
  0: {
    transform: [{ scale: 1.1 }]
  },
  1: {
    transform: [{ scale: 0.9 }]
  }
}

const isYouTubeUrl = (url: string) => {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
      setPlay(false);
    }
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        isYouTubeUrl(item.video) ? (
          <View className="w-52 h-72 rounded-[35px] mt-3 overflow-hidden">
            <WebView 
              source={{ uri: item.video }}
              style={{ width: '100%', height: '100%' }}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
        ) : (
          <Video 
            source={{ uri: item.video }}
            className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
        )
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail
            }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

// Define the type for a post item
interface Post {
  $id: string;
  id: number; 
  thumbnail: string; // Add other properties as needed
  video: string;
}

// Define the props interface
interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanges = ({ viewableItems }: { viewableItems: Array<{ key: string }> }) => {
    if (viewableItems.length > 0) {
      const viewablePost = posts.find(post => post.$id === viewableItems[0].key);
      if (viewablePost) {
        setActiveItem(viewablePost);
      }
    }
  };

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanges}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170, y: 0 }}
        horizontal
    />
  );
};

export default Trending;
