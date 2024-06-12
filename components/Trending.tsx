import { View, Text, FlatList } from 'react-native';
import React from 'react';

// Define the type for a post item
interface Post {
  $id: string;
  id: number; // Assuming 'id' is a number; adjust the type as needed
}

// Define the props interface
interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <Text className="text-3xl text-white">{item.id}</Text>
        )}
        horizontal
    />
  );
};

export default Trending;
