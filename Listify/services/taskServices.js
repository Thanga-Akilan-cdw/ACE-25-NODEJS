import InvalidTaskError from "../errors/InvalidTaskError.js";
import AuthorisationError from '../errors/AuthorisationError.js'
import { readDataFromFile, writeDataToFile } from "../utils/fileHandling.js";
import CONSTANTS from '../constants/taskConstants.js'
import { v4 as uuidv4 } from 'uuid';
import NoTaskError from "../errors/NoTaskError.js";


export const createTask = async (data) => {
    const {title, description ,priority, dueDate, comments } = data;
    const tasks = await readDataFromFile(CONSTANTS.FILENAME);
    if( title && description && priority && dueDate ){
        tasks.push({...data, id: uuidv4()});
    }else{
        throw new InvalidTaskError();
    }
    await writeDataToFile("tasks", tasks);

}

export const getTasks = async (username) => {
    const tasks = await readDataFromFile(CONSTANTS.FILENAME);
    const filteredData = await tasks.filter(task =>(task.username === username));
    if(filteredData.length==0){
        throw new NoTaskError();
    }
    return filteredData;
}


export const getTask = async(data) => {
    const { username, id } = data;
    const tasks = await readDataFromFile(CONSTANTS.FILENAME);
    const isAuthenticated = tasks.some(task => task.id == id && task.username == username);
    if(!isAuthenticated){
        throw new AuthorisationError();
    }
    const task = tasks.find(task => task.id == id && task.username == username);
    if(JSON.stringify(task)=='{}'){
        throw new NoTaskError();
    }
    return task;
}

export const updateTask = async (username , id, updateData) => {
    // Get all tasks
    let tasks = await readDataFromFile(CONSTANTS.FILENAME);
    //check if the user is authorised for the task
    const task = tasks.find(task => task.id == id);
    if(!task){
        throw new InvalidTaskError();
    }
    if(task.username !== username){
        throw new AuthorisationError();
    }
    const existingIndex = tasks.findIndex(task => task.id == id && task.username == username);
    tasks[existingIndex] = { ...tasks[existingIndex], ...updateData} ;
    await writeDataToFile(CONSTANTS.FILENAME, tasks);
}

export const deleteTask = async (data) => {
    const {username , id } = data;
    const tasks = await readDataFromFile(CONSTANTS.FILENAME);
    //check if the user is authorised for the task
    const task = tasks.find(task => task.id == id);
    if(!task){
        throw new InvalidTaskError();
    }
    if(task.username !== username){
        throw new AuthorisationError();
    }
    const newTasks = tasks.filter(task => task.id !== id);
    await writeDataToFile(CONSTANTS.FILENAME, newTasks)

}


export const filterTasks = async (tasks, properties) => {
    Object.keys(properties).forEach((property)=>{
        tasks = tasks.filter(task => task[property] == properties[property]);
    })
    return tasks;
}


export const sortTasks = async (tasks, property, order, page, limit) => {
    const orderCode = (order == 'asc') ? -1 : 1;
   if(property){ 
        tasks = tasks.sort((a,b)=>(a[property] + b[property] * orderCode));
    }
    return tasks.slice((page-1)*limit, (page * limit));
}

