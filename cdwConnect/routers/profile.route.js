import express from 'express';
import { createProfileController, fetchProfileDataController } from '../controllers/profile.controller.js';


const router = express.Router();


router.post('/', createProfileController);

router.get('/', fetchProfileDataController);


export default router;