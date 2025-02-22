import express, { Router } from 'express';
import userRouter from './user.route'
import taskRouter from './task.route'
import isAuth from '../middleware/is-auth';
const rootRouter: Router = express.Router();

rootRouter.use('/auth', userRouter);
rootRouter.use('/tasks', isAuth, taskRouter);

export default rootRouter;