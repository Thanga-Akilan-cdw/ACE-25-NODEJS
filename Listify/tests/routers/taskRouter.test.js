import { beforeEach, jest } from "@jest/globals"
import request from 'supertest';
import express from 'express';
import taskRouter from '../../routers/task.route.js';
import auth from "../../middleware/authentication";

const app = express();

app.use(express.json()); 
app.use('/tasks', auth , taskRouter)


jest.unstable_mockModule('../../controllers/taskController.js',()=>({
    createTaskController: jest.fn(),
    getTaskController: jest.fn(),
    getTasksController: jest.fn(),
    updateTaskController: jest.fn(),
    deleteTaskController: jest.fn()

}));

const { createTaskController, getTaskController, getTasksController, updateTaskController, deleteTaskController } = await import('../../controllers/taskController.js')

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRoYW5nYUFraWxhbiIsImlhdCI6MTc0NzczNzQ0OX0.JmFK5-8f90qNkcmJJfPLzHYNCq2jqIUggkj8_cAwti4';


const data = {
    body: {
    id: "dnwolendoow",
    title: "Call mom",
    username: "ThangaAkilan",
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
}


describe('TASK ROUTES', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe('POST /', ()=>{
        it('allow only if the user is authenticated', async()=>{

            createTaskController.mockResolvedValue((req, res, next) => {
                res.status(200).send("task created success");
            });

            const response = await request(app)
            .post('/tasks')
            .set('x-auth-token', authToken)
            .send(data.body);

            expect(response.statusCode).toBe(201);
        })
    })


    describe('GET /', ()=>{
        it('allow only if the user is authenticated', async()=>{

            getTasksController.mockResolvedValue((req, res) => {
                res.status(200).send("Tasks retrieved successfully");
            });

            const response = await request(app)
            .get('/tasks')
            .set('x-auth-token', authToken)
            .send(data.body);
            expect(response.statusCode).toBe(200);
        })
    })
    // describe('GET /:taskID', ()=>{
    //     it('allow only if the user is authenticated', async()=>{

    //         // getTaskController.mockResolvedValue((req, res) => {
    //         //     res.status(200).json({ taskId: req.params.taskID });
    //         // });

    //         const response = await request(app)
    //         .get('/tasks/123')
    //         .set('x-auth-token', authToken)
            
    //         console.log(response)
    //         expect(response.statusCode).toBe(200);
    //     })
    // })

})