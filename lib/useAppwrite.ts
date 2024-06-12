import { useEffect, useState, useCallback } from "react";
import { Alert } from 'react-native';

interface Post {
  $id: string;
  id: number; // Adjust the type based on your data structure
}

// Define the type for the fn parameter
type FetchFunction = () => Promise<any[]>;

const useAppwrite = (fn: FetchFunction) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      const posts: Post[] = response.map((doc: any) => ({
        $id: doc.$id,
        id: doc.id ?? Math.random(), // Ensure that this matches the structure of your documents and provide a fallback value if id is missing
      }));
      setData(posts);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, fetchData };
};

export default useAppwrite;
