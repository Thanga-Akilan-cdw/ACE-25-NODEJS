import { getPosts, getPost, storePostIntoDB, removePost, likePost, commentPost } from "../utils/postHandler.js"
import { getUser } from "../utils/userHandling.js";
import mongoose from "mongoose";

export const createPost = async (data, employeeID) => {
    const { title, location, contentLink, caption } = data;

    if(!(title && location && contentLink && caption)){
        throw new Error("Credentials missing for Post")
    }
    await storePostIntoDB({...data, employeeID: employeeID, time: Date.now()});
}

export const getAllPosts = async (data) => {
    const query = {}
    let user;
    if(data && Object.keys(data).length!=0){ user = await getUser(data);}
    if(user) query.employeeID = user.employeeID;
    const posts = await getPosts(query);
    return posts;
}

export const getPostByID = async (postID) => {
    const post = await getPost(postID);
    return post;
  }


  export const deletePost = async (employeeID, postID) => {
   return (await removePost(employeeID, postID));
  }

  export const likePostService = async (employeeID, postID) => {
    await likePost(employeeID, postID);
  }

  export const commentPostService = async (employeeID, postID, content) => {
    await commentPost(employeeID, postID, content);
  }