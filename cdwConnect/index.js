import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRouter from './routers/auth.route.js'
import { runStartupJobs } from './startup/index.js';
import errorHandler from './middleware/errorHandler.js';
import { adminAuthentication, userAuthentication } from './middleware/authentication.js';
import approvalRouter from './routers/approval.route.js'
import profileRouter from './routers/profile.route.js';
import postRouter from './routers/post.route.js'
import searchRouter from './routers/search.route.js'
import setupSwagger from './swagger.js'

const app = express();
dotenv.config();

await connectDB();
runStartupJobs();

app.use(express.json());

app.use('/', authRouter);

app.use('/approval/', adminAuthentication, approvalRouter);

app.use('/profile', userAuthentication, profileRouter);

app.use('/post', userAuthentication, postRouter);

app.use('/search', userAuthentication, searchRouter);

setupSwagger(app);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
})