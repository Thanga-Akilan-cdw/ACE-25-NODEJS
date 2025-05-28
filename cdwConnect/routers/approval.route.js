import express from 'express'
import { fetchPendingUsersController } from '../controllers/approval.controller.js';
import { approveUserController } from '../controllers/approval.controller.js';

const router = express.Router();


router.get('/pending', fetchPendingUsersController);

router.post('/verify/:employeeID', approveUserController);



export default router;