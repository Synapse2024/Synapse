import React, { useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import useGlobalStore from '@/hooks/useGlobalStore';

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const { setIsLoggedIn, setUser, setIsLoading } = useGlobalStore();
  
    useEffect(() => {
      const checkSession = async () => {
        setIsLoading(true);
        try {
          const currentUser = await getCurrentUser(); // Checks if there is an active session
          if (currentUser) {
            setIsLoggedIn(true);
            setUser(currentUser);
          } else {
            const session = localStorage.getItem('session');
            if (session) {
              const { email, password } = JSON.parse(session);
              try {
                await signIn(email, password); // Attempt to sign in only if no active user session is found
                const newCurrentUser = await getCurrentUser();
                setIsLoggedIn(true);
                setUser(newCurrentUser);
              } catch (signInError) {
                console.log('Error in signIn:', signInError);
                // Optionally, handle existing session scenario
              }
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          }
        } catch (error) {
          console.log('Error in getCurrentUser:', error);
          setIsLoggedIn(false);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      };
  
      checkSession();
    }, [setIsLoggedIn, setUser, setIsLoading]);
  
    return children;
  };
  
  export default GlobalProvider;
  
  
