import { createTaskController, getTasksController, getTaskController, updateTaskController, deleteTaskController } from "../../controllers/taskController.js"
import {beforeAll, beforeEach, jest} from '@jest/globals';
import { createRequest, createResponse } from "node-mocks-http";

jest.unstable_mockModule('../../services/taskServices.js',()=>({
    createTask: jest.fn(),
    getTask: jest.fn(),
    getTasks: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    filterTasks: jest.fn(),
    sortTasks: jest.fn()
}));

const { createTask, getTask, updateTask, deleteTask } = await import("../../services/taskServices.js")

const data = {
    body: {
    title: "Call mom",
    description:"Call mom to know about her health",
    priority: 2,
    dueDate: "20-04-2025",
    comments :[
        {
            message: "good",
            timestamp: new Date()
        }
    ]
    },
    username: "Akil"
}


beforeEach(()=>{
    jest.clearAllMocks();
})

// create task
describe('POST /tasks', ()=>{
    const task = {
        title: 'Test Task',
        description: 'test',
        priority: 'high',
        dueDate: '2025-05-22',
        comments: []
        }
    it('Providing required details sends 201',async ()=>{
        createTask.mockResolvedValue()

        const req = createRequest({
            body: task,
            data: { username: "john" } 
          })
        const res = createResponse();
        const next = jest.fn();

        await createTaskController(req, res, next);

        expect(res.statusCode).toBe(201);
    })
    it('Without auth token sends 500',async ()=>{
        createTask.mockResolvedValue()

        const req = createRequest({
            body: task,
            data: { username: null } 
          });
        const res = createResponse();
        const next = jest.fn();


        await createTaskController(req, res, next);
        expect(res.statusCode).toBe(401); 
    })
})

describe('GET /', ()=>{
    
    it('Get all tasks of user', async ()=>{

        const req = createRequest({data: {body: {username: "john"} }});
        const res = createResponse();
        const next = jest.fn();

        await getTasksController(req, res, next);

        expect(res.statusCode).toBe(200);
    })
})

describe('GET /:taskID',  ()=>{
    const task = {
    title: 'Test Task',
    description: 'test',
    priority: 'high',
    dueDate: '2025-05-22',
    comments: []
    }
    it('get the task', async ()=>{
        getTask.mockResolvedValue(task);

        const req = createRequest({data: {body: {username: "john"} }, params: {taskID: "sdkdjhe38e2"}});
        const res = createResponse();
        const next = jest.fn();

        await getTaskController(req, res, next);

        expect(res.statusCode).toBe(200);
    })
    

})

describe('PATCH /:taskID', ()=>{
    it('update the task', async ()=>{

        const req = createRequest({data: {body: {username: "john"} }, params: {taskID: "sdkdjhe38e2"}});
        const res = createResponse();
        const next = jest.fn();

        await updateTaskController(req,res,next);
        expect(res.statusCode).toBe(200);
    })

})

describe('DELETE /:taskID', ()=>{
    it('delete the task', async ()=>{

        const req = createRequest({data: {body: {username: "john"} }, params: {taskID: "sdkdjhe38e2"}});
        const res = createResponse();
        const next = jest.fn();

        await deleteTaskController(req,res,next);
        
        expect(res.statusCode).toBe(200);
        
    })

})
