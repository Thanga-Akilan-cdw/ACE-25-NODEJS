import { Post } from "../models/Post.js";
import mongoose from "mongoose";

export const storePostIntoDB = async (data) => {
    console.log(data)
    await Post.insertOne(data);
}

export const getPost = async (postID) => { 
    let query = {};
    if (postID) {
    query = { _id: new mongoose.Types.ObjectId(postID) }; 
    }
    const post = await Post.findOne(query);
    return post;
}

export const getPosts = async (query) => {
    const posts = await Post.find(query);
    return posts;
}

export const removePost = async (employeeID, postID) => {
    const result = await Post.deleteOne({employeeID, _id: new mongoose.Types.ObjectId(postID)});
    return result;
}

export const likePost = async (employeeID, postID) => {
    await Post.updateOne(
        {_id: new mongoose.Types.ObjectId(postID),"likes.employeeID": { $ne: employeeID }},
        {$addToSet: {likes: {employeeID}}}
    )
}

export const commentPost = async (employeeID, postID, content) => {
    await Post.updateOne(
        {_id: new mongoose.Types.ObjectId(postID)},
        {$push: {comments: {employeeID, content}}}
    )
}

