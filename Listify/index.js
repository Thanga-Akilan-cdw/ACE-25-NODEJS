import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/user.route.js';
import taskRouter from './routers/task.route.js'
import errorHandler from './middleware/errorHandler.js';
import { userLogger, taskLogger } from './logger/index.js';
import auth from './middleware/authentication.js'

const app = express();
dotenv.config()

// app.use((req, res, next) => {
//     logger.http(`${req.method} ${req.url}`);
//     next();
//   });

app.use(express.json());

app.use('/', userRouter)

app.use('/tasks', [auth] , taskRouter)

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    // console.log(`Listening at port ${process.env.PORT}`);
})

export default app;