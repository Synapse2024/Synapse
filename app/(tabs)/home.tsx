import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';

const Home = () => {
  return (
    <SafeAreaView className="bg-black flex-1">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white p-2">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="p-5">
            <View className="flex-row justify-between mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">Username1</Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.altLogoSmall}
                  className="w-13 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            {/*<SearchInput 
              title="Search"
              value={searchValue}
              placeholder="Search something..."
              handleChangeText={handleSearchChange}/>*/}
            <View>

            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
