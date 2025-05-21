import express from 'express';
import { createTaskController, deleteTaskController, getTaskController, getTasksController, updateTaskController } from '../controllers/taskController.js';

const router = express.Router();

// Create a task with title, description, priority, due date and task comments
router.post('/', createTaskController);

router.get('/', getTasksController);

router.get('/:taskID', getTaskController);

router.patch('/:taskID', updateTaskController);

router.delete('/:taskID', deleteTaskController);


export default router;