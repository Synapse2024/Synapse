import { Account, Avatars, Databases, Client, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.Synapse.Synapse',
    projectId: '666761270028c042ce2b',
    databaseId: '66676b5b0017a922b0a7',
    userCollectionId: '66676bca00344a6f78c3',
    videoCollectionId: '66676dc20017f10dc081',
    storageId: '666770a4002a8165f5cb'
};

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        const userId = ID.unique();
        console.log('Generated userId:', userId);

        const newAccount = await account.create(userId, email, password, username);
        console.log('newAccount:', newAccount);

        if (!newAccount) throw new Error('Account creation failed');

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUserId = ID.unique();
        console.log('Generated newUserId for document:', newUserId);

        const newUser = await databases.createDocument(
            config.databaseId, 
            config.userCollectionId,
            newUserId,
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        console.log('newUser:', newUser);
        return newUser;
    } catch (error) {
        console.log('Error in createUser:', error);
        if (error instanceof Error) {
            throw new Error(error.message || 'Unknown error occurred');
        } else {
            throw new Error('Unknown error occurred');
        }
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        console.log('Signing in with email:', email); // Log email

        // Check if there is an active session
        const sessions = await account.listSessions();
        if (sessions.sessions.length > 0) {
            console.log('Active session found, using existing session.');
            return sessions.sessions[0];
        }

        const session = await account.createEmailPasswordSession(email, password);
        console.log('Session created:', session); // Log the session object

        // Store session credentials in localStorage
        localStorage.setItem('session', JSON.stringify({ email, password }));
        return session;
    } catch (error) {
        console.log('Error in signIn:', error);
        if (error instanceof Error) {
            throw new Error(error.message || 'Unknown error occurred');
        } else {
            throw new Error('Unknown error occurred');
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('account', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        );

        return posts.documents;
    } catch (error) {
        console.log('Error in getAllPosts:', error);
        if (error instanceof Error) {
            throw new Error(error.message || 'Unknown error occurred');
        } else {
            throw new Error('Unknown error occurred');
        }
    }
}

export const getLatestVideos = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );

        return posts.documents;
    } catch (error) {
        console.log('Error in getLatestVideos:', error);
        if (error instanceof Error) {
            throw new Error(error.message || 'Unknown error occurred');
        } else {
            throw new Error('Unknown error occurred');
        }
    }
}