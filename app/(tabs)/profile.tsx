import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { getUserPosts, searchPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';
import useGlobalStore from '@/hooks/useGlobalStore';

interface Post {
  $id: string;
  id: number; 
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalStore();
  const fetchFunction = () => getUserPosts(user.$Id as string); // Ensure query is a string

  const { data: posts } = useAppwrite(fetchFunction);

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <SafeAreaView className="bg-black flex-1 h-full">
      <FlatList<Post>
        data={posts}
        keyExtractor={(item, index) => item.id.toString() + index} // Ensure unique keys by combining id and index
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="text-2xl font-psemibold text-white">{/*{query}*/}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                title="Search"
                value={searchValue}
                placeholder="Search videos..."
                handleChangeText={handleSearchChange}
                //initialQuery={query as string} // Ensure query is a string
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
