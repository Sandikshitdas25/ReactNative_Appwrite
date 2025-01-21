import {Account, Avatars, Client, Databases, OAuthProvider} from "react-native-appwrite"
import * as Linking from "expo-linking"
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: "com.real.estate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIS_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
}

export const client = new Client();

client 
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform)


export const avatar = new Avatars(client)
export const account = new Account(client)
export const databases = new Databases(client)


export async function login() {
    try{
        const redirectUri = Linking.createURL("/");
        const response = await account.createOAuth2Token(
            OAuthProvider.Google, 
            redirectUri
        )
        //In response we will get a token
        if(!response) throw new Error("failed to login")

        //If we get token in response it will run a browser session to continue login process in browserResult
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if(browserResult.type != "success") throw new Error("failed to login")
        
        const url = new URL(browserResult.url)

        const secret = url.searchParams.get("secret")?.toString()
        const userId = url.searchParams.get("userId")?.toString()

        if(!secret && !userId) throw new Error("Create OAuth2 token failed")

        const session = await account.createSession(userId!, secret!)
        if(!session) throw new Error("failed to create session")
        
        return true

    }catch(error){
        console.log(error)
        return false
    }
}

export async function logout() {
    try {
        const result = await account.deleteSession("current")
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get()

        if(response.$id) {
            const userAvatar = avatar.getInitials(response.name)
            return {
                ...response,
                avatar: userAvatar.toString()
            }
        }
    } catch (error) {
        
    }
}