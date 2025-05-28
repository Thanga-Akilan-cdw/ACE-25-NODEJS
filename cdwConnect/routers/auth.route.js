import express from 'express';
import { signinUserController, signupUserController } from '../controllers/auth.controller.js';


const router = express.Router();


router.post('/signup', signupUserController);

router.post('/signin', signinUserController);

export default router;