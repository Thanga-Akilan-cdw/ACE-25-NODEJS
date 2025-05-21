import AuthorisationError from "../errors/AuthorisationError.js";
import { getTask, getTasks, createTask, deleteTask, updateTask, filterTasks, sortTasks } from "../services/taskServices.js";
import { taskLogger } from "../logger/index.js";

export const createTaskController = async (req, res, next) => {
    try{
        const { username } = req.data;
        const taskData = req.body;
        if(username){
            await createTask({...taskData, username: username});
            res.status(201).send("Task created Successfully")
            taskLogger.info(`Task created by ${username}`)
        }else{
            res.status(401).send("Invalid User");
            taskLogger.warn(`Task creation terminated for user`)
        }
    }catch(error){
        return next(error);
    }
    
}


export const getTasksController  = async (req, res, next) => {
    try{
        const { username } = req.data;
        const {sortBy, order='asc', page=1, limit=5, ...filterProperties} = req.query;
        let tasks = await getTasks(username);
        tasks = await filterTasks(tasks, filterProperties);
        tasks = await sortTasks(tasks, sortBy, order, page, limit);
        taskLogger.info(`Fetched tasks of user ${username}`);
        res.send(tasks);
    }catch(error){
        next(error);
    }
}

export const getTaskController = async (req, res, next) => {
    try{
        const { username } = req.data;
        const id = req.params.taskID;
        const task = await getTask({ username, id })
        taskLogger.info(`Fetch task ${id} by the user ${username}`)
        res.send(task);
    }catch(error){
        next(error);
    }
}

export const updateTaskController = async (req,res,next) => {
    try{
        const { username } = req.data;
        const taskData = req.body;
        const id = req.params.taskID;
        await updateTask(username, id, taskData);
        taskLogger.info(`Updated task ${id} by user ${username}`);
        res.send("task details updated successfully");
    }catch(error){
        next(error);
    }
}

export const deleteTaskController = async (req,res,next) => {
    try{
        const { username } = req.data;
        const id = req.params.taskID;
        await deleteTask({username, id});
        taskLogger.info(`Deleted task ${id} by user ${username}`)
        res.send(`task ${id} deleted successfully`);
    }catch(error){
        next(error);
    }
}





