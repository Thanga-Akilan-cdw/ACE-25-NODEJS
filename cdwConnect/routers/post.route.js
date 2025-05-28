import express from 'express';
import { createPostController, getAllPostsController } from '../controllers/post.controller';

const router = express.Router();


router.post('/', createPostController);

router.get('/', getAllPostsController);

// router.get('/:postID', getPostController);