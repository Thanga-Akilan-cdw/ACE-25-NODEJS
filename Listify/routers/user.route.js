import express from 'express';
import { signupUserController, signinUserController } from '../controllers/userController.js';


const router = express.Router();


router.post('/signup', signupUserController)

router.post('/signin', signinUserController);

export default router;