import { createPost, getAllPosts, deletePost, getPostByID, likePostService, commentPostService } from "../services/post.service.js";
import { serviceLogger } from "../logger/index.js";

export const createPostController = async (req, res, next) => {
    try{
        const postData = req.body;
        const {employeeID} = req.user;
        if(!employeeID){
            const error = new Error('User not Authenticated');
            error.statusCode = 401;
            throw error;
        }
        if(!postData){
            const error = new Error('Post Data not provided');
            error.statusCode = 400;
            throw error;
        }
        await createPost(postData, employeeID);
        serviceLogger.info(`Created a post by user ${employeeID}`)
        res.send("Post created Successfully")
    }
    catch(error){
        next(error);
    }
}

export const getAllPostsController = async (req, res, next) => {
    try{
        const query = {}
        const email= req.query.email;
        if(email)query.email = email;
        const posts = await getAllPosts(query);
        serviceLogger.info(`Fetched Posts `)
        res.send(posts);
    }
    catch(error){
        next(error);
    }
}


export const getPostsByIdController = async (req, res, next) => {
    try{
        const postID = req.params.postID;
        if(!postID){
            const error = new Error('Post identifier not provided');
            error.statusCode = 400;
            throw error;
        }
        const posts = await getPostByID(postID);
        serviceLogger.info(`Fetched Post ${postID} by ID`)
        res.send(posts);
    }
    catch(error){
        next(error);
    }
}

export const deletePostController = async (req, res, next) => {
    try{
        const {employeeID} = req.user;
        const postID = req?.params?.postID ;
        if(!employeeID){
            const error = new Error('User not Authenticated');
            error.statusCode = 401;
            throw error;
        }
        if(!postID){
            const error = new Error('Post ID not provided');
            error.statusCode = 400;
            throw error;
        }
        const result = await deletePost(employeeID, postID)
        serviceLogger.info(`Deleted Post ${postID} `)
        res.send(`Post ${postID} deleted Successfully `)
    }
    catch(error){
        next(error);
    }
}

export const likePostController = async (req, res, next) => {
    try{
        const {employeeID} = req.user;
        const postID = req.params.postID;
        if(!employeeID){
            const error = new Error('User not Authenticated');
            error.statusCode = 401;
            throw error;
        }
        if(!postID){
            const error = new Error('Post ID not provided');
            error.statusCode = 400;
            throw error;
        }
        await likePostService(employeeID, postID);
        serviceLogger.info(`User ${employeeID} liked post ${postID}`);
        res.send("Liked the Post");

    }
    catch(error){
        next(error);
    }
}

export const commentPostController = async (req, res, next) => {
    try{
        const {employeeID} = req?.user;
        const postID = req?.params?.postID;
        const content = req?.body?.content ;
        if(!employeeID){
            const error = new Error('User not Authenticated');
            error.statusCode = 401;
            throw error;
        }
        if(!postID){
            const error = new Error('Post ID not provided');
            error.statusCode = 400;
            throw error;
        }
        if(!content){
            const error = new Error('Content not provided');
            error.statusCode = 400;
            throw error;
        }
        await commentPostService(employeeID, postID, content);
        serviceLogger.info(`Comment added to post ${postID}`)
        res.send("Comment Added successfully");
    }
    catch(error){
        next(error);
    }
}
