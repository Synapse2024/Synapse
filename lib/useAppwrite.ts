import { useEffect, useState, useCallback } from "react";
import { Alert } from 'react-native';

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

// Define the type for the fn parameter
type FetchFunction = () => Promise<any[]>;

const useAppwrite = (fetchFunction: FetchFunction) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchFunction();
      const posts: Post[] = response.map((doc: any) => ({
        $id: doc.$id,
        id: doc.id ?? Math.random(),
        title: doc.title,
        thumbnail: doc.thumbnail,
        video: doc.video,
        creator: {
          username: doc.creator.username,
          avatar: doc.creator.avatar,
        },
      }));
      setData(posts);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
