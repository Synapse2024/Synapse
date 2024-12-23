import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard';
import { getAllPosts, getLatestVideos } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

// Define the Post type here or import it from where it's defined
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

const Home = () => {
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);

  const { data: latestVideos, isLoading: isLatestLoading, refetch: refetchLatest } = useAppwrite(getLatestVideos);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchLatest();
    setRefreshing(false);
  };

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
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="p-5">
            <View className="flex-row justify-between mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">testing123</Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.altLogoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput 
              title="Search"
              value={searchValue}
              placeholder="Search something..."
              handleChangeText={handleSearchChange}/>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  );
};

export default Home;
