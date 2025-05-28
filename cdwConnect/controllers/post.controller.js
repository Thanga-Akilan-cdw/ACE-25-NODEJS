import { createPost, getAllPosts } from "../services/post.service";


export const createPostController = async (req, res, next) => {
    const postData = req.body;
    await createPost(postData);
    res.send("Post created Successfully")
}

export const getAllPostsController = async (req, res, next) => {
    const {employeeID} = req.query;
    const posts = await getAllPosts({employeeID});
    res.send(posts);
}

