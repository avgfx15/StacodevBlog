import express from 'express';
const userRouter = express.Router();
import {
  testController,
  updateUserController,
} from '../CONTROLLERS/userControllers.js';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';

userRouter.get('/test', testController);

userRouter.put(
  '/update/:userId',
  verifyAuthUserMiddleware,
  updateUserController
);

export default userRouter;
