import express from 'express';
import { testController } from '../CONTROLLERS/userControllers.js';

const userRouter = express.Router();

userRouter.get('/test', testController);

export default userRouter;
