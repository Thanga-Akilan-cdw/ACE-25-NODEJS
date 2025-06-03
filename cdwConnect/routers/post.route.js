import express from 'express';
import { commentPostController, createPostController, deletePostController, getAllPostsController, getPostsByIdController, likePostController } from '../controllers/post.controller.js';

const router = express.Router();
/**
 * @swagger
 * /post/:
 *   post:
 *     summary: Create a news feed
 *     tags:
 *       - News Feed
 *     security:
 *       - ApiKeyAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - location
 *               - contentLink
 *               - caption
 *             properties:
 *               title:
 *                 type: string
 *                 example: NodeJS Contribution
 *               location:
 *                 type: string
 *                 example: Chennai
 *               contentLink:
 *                 type: string
 *                 example: https://www.linktoimage.in/
 *               caption:
 *                 type: string
 *                 example: Loved the work
 *     responses:
 *       200:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized – token missing or invalid
 */

router.post('/', createPostController);


/**
 * @swagger
 * /post/:
 *   get:
 *     summary: Get all posts (optionally filtered by user email)
 *     tags:
 *       - Posts
 *     security:
 *       - ApiKeyAuth: [] 
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by user email
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: NodeJS Contribution
 *                   location:
 *                     type: string
 *                     example: Chennai
 *                   contentLink:
 *                     type: string
 *                     example: https://www.linktoimage.in/
 *                   caption:
 *                     type: string
 *                     example: Loved the work
 *                   employeeID:
 *                     type: number
 *                     example: 12838
 *                   time:
 *                     type: integer
 *                     example: 1717259033000
 *       500:
 *         description: Server error
 */
router.get('/', getAllPostsController);

router.get('/:postID', getPostsByIdController);

router.delete('/:postID', deletePostController);

router.post('/like/:postID', likePostController);

router.post('/comment/:postID', commentPostController);

export default router;