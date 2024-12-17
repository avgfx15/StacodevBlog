import express from 'express';
const userRouter = express.Router();

// & Controller
import {
  testController,
  updateUserController,
  deleteUserByIdController,
  signOutUserController,
} from '../CONTROLLERS/userControllers.js';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';

// & Test Route
userRouter.get('/test', testController);

// * Update User Data
userRouter.put(
  '/update/:userId',
  verifyAuthUserMiddleware,
  updateUserController
);

// - Delete User
userRouter.delete(
  '/delete/:userId',
  verifyAuthUserMiddleware,
  deleteUserByIdController
);

// & Signout
userRouter.post('/signout', signOutUserController);

export default userRouter;
