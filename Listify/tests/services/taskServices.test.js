import { beforeEach, expect, jest } from "@jest/globals"
import NoTaskError from "../../errors/NoTaskError.js";
import AuthorisationError from "../../errors/AuthorisationError.js";
import InvalidTaskError from "../../errors/InvalidTaskError.js";

jest.unstable_mockModule('../../utils/fileHandling.js',()=>({
    readDataFromFile: jest.fn(),
    writeDataToFile: jest.fn()
}))

jest.unstable_mockModule('../../constants/taskConstants.js', () => ({
    default: { FILENAME: 'tasks.json' }
  }));

const { readDataFromFile, writeDataToFile } = await import('../../utils/fileHandling.js');

const CONSTANTS = (await import('../../constants/taskConstants.js')).default;

describe('TASK SERVICES', ()=>{
    
    // create task
    describe('CREATE TASK', ()=>{

        
        it('Add a task and send 201 response',async ()=>{
        const  {createTask}  = await import("../../services/taskServices.js");
            readDataFromFile.mockResolvedValue([]);
            writeDataToFile.mockResolvedValue();

        const taskData = {
        title: 'Test Task',
        description: 'test',
        priority: 'high',
        dueDate: '2025-05-22',
        comments: [],
        username: 'john'
        };

            await createTask(taskData);

            expect(readDataFromFile).toHaveBeenCalledWith(CONSTANTS.FILENAME);
            expect(writeDataToFile).toHaveBeenCalled();
        })
        it('Creating a task without necessary details throws error', async ()=>{
            const  {createTask}  = await import("../../services/taskServices.js");
            readDataFromFile.mockResolvedValue([]);
            writeDataToFile.mockResolvedValue();

            const taskData = {
                title: 'Test Task',
                description: 'test',
            }


        expect(async()=>{await createTask(taskData)}).rejects.toThrow(InvalidTaskError);

        })
    })

    describe('GET TASKS' , ()=>{
        const tasks = [{
            title: 'Test Task',
            description: 'test',
            priority: 'high',
            dueDate: '2025-05-22',
            comments: [],
            username: 'john'
        },
        {
            title: 'Test Task 2',
            description: 'test',
            priority: 'high',
            dueDate: '2025-05-22',
            comments: [],
            username: 'john'
        }

        ]
        it('throw error when the task is empty', async ()=>{
            const  {getTasks}  = await import("../../services/taskServices.js");
            readDataFromFile.mockResolvedValue(tasks);

            expect(async ()=>await getTasks( 'AKil')).rejects.toThrow(NoTaskError);
        })

        it('return tasks of the user', async ()=>{
            const  {getTasks}  = await import("../../services/taskServices.js");
            readDataFromFile.mockResolvedValue(tasks);

            expect(JSON.stringify(await getTasks("john"))).toBe(JSON.stringify(tasks));
            

        })
    })

    describe('GET TASK', ()=>{
        it('Get the task with task id requested',async ()=>{
            const task = {
                title: 'Test Task',
                description: 'test',
                priority: 'high',
                dueDate: '2025-05-22',
                comments: [],
                username: 'AKil',
                id:"2ahsb3e2u"
            };
            readDataFromFile.mockResolvedValue([task]);

            const { getTask } = await import("../../services/taskServices.js");
            expect(async()=> await getTask({username: 'john', id:"2ahsb3e2u"})).rejects.toThrow(AuthorisationError);
            
        })
    })


    describe('UPDATE TASK', ()=>{
        
        const tasks = [
        {
            title: 'Test Task',
            description: 'test',
            priority: 'high',
            dueDate: '2025-05-22',
            comments: [],
            username: 'AKil',
            id:"2ahsb3e2u"
        },{
            title: 'Test Task',
            description: 'test',
            priority: 'high',
            dueDate: '2025-05-22',
            comments: [],
            username: 'AKil',
            id:"2ahsaksd3e2u"
        }
    ]
        it('New entry is not added : task not found',async ()=>{
            

            const updateTaskInfo = {
                username: "AKil",
                id: "2ahsaksd3u",
                updateData: {
                    title: "Updated Task"
                }
            }


            const {username, id, updateData} = updateTaskInfo;

            const { updateTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            expect( async()=> await updateTask(username, id, updateData)).rejects.toThrow(InvalidTaskError);

        })
        it('New entry is not added : not authorisation', async ()=>{
            const updateTaskInfo = {
                username: "Arunil",
                id: "2ahsaksd3e2u",
                updateData: {
                    title: "Updated Task"
                }
            }

            const {username, id, updateData} = updateTaskInfo;


            const { updateTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            expect( async()=> await updateTask(username, id, updateData)).rejects.toThrow(AuthorisationError);
        })

        it('Field is updated ', async ()=>{
            const updateTaskInfo = {
                username: "AKil",
                id: "2ahsaksd3e2u",
                updateData: {
                    title: "Updated Task"
                }
            }

            const {username, id, updateData} = updateTaskInfo;


            const { updateTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            writeDataToFile.mockResolvedValue();

            await updateTask(username, id, updateData)

            expect(writeDataToFile).not.toHaveBeenCalledWith(tasks);
            expect(tasks.length).toBe(2);
        })
    })

    describe('DELETE TASK', ()=>{
        beforeEach(()=>{
            jest.clearAllMocks();
        })
        const tasks = [
            {
                title: 'Test Task',
                description: 'test',
                priority: 'high',
                dueDate: '2025-05-22',
                comments: [],
                username: 'AKil',
                id:"2ahsb3e2u"
            },{
                title: 'Test Task',
                description: 'test',
                priority: 'high',
                dueDate: '2025-05-22',
                comments: [],
                username: 'AKil',
                id:"2ahsaksd3e2u"
            }
        ]
        it('Task not found to delete task',async ()=>{
            const deleteTaskInfo = {
                username: "AKil",
                id: "2aaksd3e2u",
            }
            const { deleteTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            writeDataToFile.mockResolvedValue();


            expect(async()=> await deleteTask(deleteTaskInfo)).rejects.toThrow(InvalidTaskError);
        })
        it('Not Authorised to delete task',async ()=>{
            const deleteTaskInfo = {
                username: "Aruil",
                id: "2ahsaksd3e2u",
            }
            const { deleteTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            writeDataToFile.mockResolvedValue();


            expect(async()=> await deleteTask(deleteTaskInfo)).rejects.toThrow(AuthorisationError);
        })
        it('Delete a task',async ()=>{
            const deleteTaskInfo = {
                username: "AKil",
                id: "2ahsaksd3e2u",
            }
            const { deleteTask } = await import("../../services/taskServices.js");

            readDataFromFile.mockResolvedValue(tasks);
            writeDataToFile.mockResolvedValue();

            await deleteTask(deleteTaskInfo);

            expect(writeDataToFile).toBeCalledTimes(1);
        })
    })

})