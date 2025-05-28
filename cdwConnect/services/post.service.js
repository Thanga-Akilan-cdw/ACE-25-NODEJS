import { getPosts, storePostIntoDB } from "../utils/postHandler"


export const createPost = async (data) => {
    await storePostIntoDB(data);
}

export const getAllPosts = async (employeeID) => {
    const query = {}
    if(employeeID) {query.employeeID = employeeID}
    const posts = await getPosts(query);
    return posts;
}