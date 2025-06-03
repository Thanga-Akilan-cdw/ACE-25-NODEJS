import { Post } from "../models/Post.js";
import mongoose from "mongoose";
import { dbLogger } from "../logger/index.js";

export const storePostIntoDB = async (data) => {
    await Post.insertOne(data);
    dbLogger.info(`Inserted a Post titled ${data.title}`)
}

export const getPost = async (postID) => { 
    let query = {};
    if (postID) {
    query = { _id: new mongoose.Types.ObjectId(postID) }; 
    }
    const post = await Post.findOne(query);
    dbLogger.info(`Fetched a Post with ID ${postID}`)
    return post;
}

export const getPosts = async (query) => {
    const posts = await Post.find(query);
    dbLogger.info(`Fetched posts from Posts Collection`)
    return posts;
}

export const removePost = async (employeeID, postID) => {
    const result = await Post.deleteOne({employeeID, _id: new mongoose.Types.ObjectId(postID)});
    dbLogger.info(`Removed a Post ${postID} from collection`)
    return result;
}

export const likePost = async (employeeID, postID) => {
    await Post.updateOne(
        {_id: new mongoose.Types.ObjectId(postID),"likes.employeeID": { $ne: employeeID }},
        {$addToSet: {likes: {employeeID}}}
    )
    dbLogger.info(`Like added to the post ${postID}`)
}

export const commentPost = async (employeeID, postID, content) => {
    await Post.updateOne(
        {_id: new mongoose.Types.ObjectId(postID)},
        {$push: {comments: {employeeID, content}}}
    )
    dbLogger.info(`Comment added to the post ${postID}`)
}

