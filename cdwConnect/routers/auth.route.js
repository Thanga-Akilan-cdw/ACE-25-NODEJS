import express from 'express';
import { signinUserController, signupUserController } from '../controllers/auth.controller.js';


const router = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - employeeID
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: Thanga Akilan
 *               email:
 *                 type: string
 *                 example: akilan@cdw.com
 *               employeeID:
 *                 type: number
 *                 example: 123782
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *               role:
 *                 type: string
 *                 enum: [admin, co-worker]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Signup Successful
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Signup Successful
 *       400:
 *         description: Bad Request (missing or invalid fields)
 *       409:
 *         description: User Already Exists
 *       500:
 *         description: Server Error
 */
router.post('/signup', signupUserController);


/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags:
 *       - Auth
 *     security:
 *      - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeID
 *               - password
 *               - role
 *             properties:
 *               employeeID:
 *                 type: number
 *                 example: 123782
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Signin successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing fields in request
 *       401:
 *         description: Unauthorized – Invalid credentials or role
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/signin', signinUserController);

export default router;