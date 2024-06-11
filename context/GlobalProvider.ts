/*
import { getCurrentUser } from '@/lib/appwrite';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types for the context values
interface GlobalContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: any; // You can replace `any` with a specific type if you have one for the user
    setUser: (value: any) => void;
    isLoading: boolean;
}

// Create a context with a default value of `undefined`
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

// Define the type for GlobalProvider props
interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null); // You can replace `any` with a specific type if you have one for the user
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
*/