import { createPost, getAllPosts, deletePost, getPostByID, likePostService, commentPostService } from "../services/post.service.js";


export const createPostController = async (req, res, next) => {
    const postData = req.body;
    const {employeeID} = req.user;
    await createPost(postData, employeeID);
    res.send("Post created Successfully")
}

export const getAllPostsController = async (req, res, next) => {
    try{
        const query = {}
        const email= req.query.email;
        if(email)query.email = email;
        const posts = await getAllPosts(query);
        res.send(posts);
    }
    catch(error){
        next(error);
    }
}


export const getPostsByIdController = async (req, res, next) => {
    try{
        const postID = req.params.postID;
        const posts = await getPostByID(postID);
        res.send(posts);
    }
    catch(error){
        next(error);
    }
}

export const deletePostController = async (req, res, next) => {
    try{
        const {employeeID} = req.user;
        const postID = req.params.postID;
        const result = await deletePost(employeeID, postID)
        res.send(`Post ${postID} ${result.deletedCount} deleted Successfully `)
    }
    catch(error){
        next(error);
    }
}

export const likePostController = async (req, res, next) => {
    try{
        const {employeeID} = req.user;
        const postID = req.params.postID;
        await likePostService(employeeID, postID);
        res.send("Liked the Post");

    }
    catch(error){
        next(error);
    }
}

export const commentPostController = async (req, res, next) => {
    try{
        const {employeeID} = req.user;
        const postID = req.params.postID;
        const {content} = req.body;
        await commentPostService(employeeID, postID, content);
        res.send("Comment Added successfully");

    }
    catch(error){
        next(error);
    }
}
