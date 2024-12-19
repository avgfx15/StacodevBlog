import express from 'express';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';
import { createNewPostController } from '../CONTROLLERS/postControllers.js';

const postRouter = express.Router();

postRouter.post(
  '/createnewPost',
  verifyAuthUserMiddleware,
  createNewPostController
);

export default postRouter;
