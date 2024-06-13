import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState } from 'react';

interface TrendingItemProps {
  activeItem: Post;
  item: Post;
}

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }]
  },
  1: {
    transform: [{ scale: 1 }]
  }
}

const zoomOut = {
  0: {
    transform: [{ scale: 1 }]
  },
  1: {
    transform: [{ scale: 0.9 }]
  }
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className="text-white">Playing</Text>
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
}

// Define the props interface
interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        horizontal
    />
  );
};

export default Trending;
