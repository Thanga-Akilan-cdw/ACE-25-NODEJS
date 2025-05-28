import { getDB } from "./db"


export const storePostIntoDB = async (data) => {
    const database = await getDB();
    await database.collection('posts').insertOne({data});
}

export const getPosts = async (query) => {
    const database = await getDB();
    await database.collection('posts').find(query);
}


