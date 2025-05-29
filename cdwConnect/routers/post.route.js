import express from 'express';
import { commentPostController, createPostController, deletePostController, getAllPostsController, getPostsByIdController, likePostController } from '../controllers/post.controller.js';

const router = express.Router();


router.post('/', createPostController);

router.get('/', getAllPostsController);

router.get('/:postID', getPostsByIdController);

router.delete('/:postID', deletePostController);

router.post('/like/:postID', likePostController);

router.post('/comment/:postID', commentPostController);

export default router;