import {
  Account,
  Avatars,
  Client,
  ID,
  Databases,
  Query,
} from "react-native-appwrite";

// export const config = {
//   endpoint: "https://cloud.appwrite.io/v1",
//   platform: "com.ade/aora_mobile",
//   projectId: "66a3f069003e3994fa8d",
//   databaseId: "669ab74e0034b5ebef73",
//   userCollectionId: "669ab78f0004c3384c87",
//   videoCollectionId: "669ab7bb001f3af78d07",
//   storageId: "669ab99d003df305a185",
// };

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.delani.aora",
  projectId: "669ab5240026cc469c24",
  databaseId: "669ab74e0034b5ebef73",
  userCollectionId: "669ab78f0004c3384c87",
  videoCollectionId: "669ab7bb001f3af78d07",
  storageId: "669ab99d003df305a185",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
