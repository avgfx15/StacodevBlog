import express from 'express';
import {
  createCommentController,
  // getAllCommentedUserIdsByPostIdController,
  getAllCommentsByPostIdController,
} from '../CONTROLLERS/commentController.js';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';

const commentRouter = express.Router();

commentRouter.post(
  '/create',
  verifyAuthUserMiddleware,
  createCommentController
);

commentRouter.get(
  '/allcommentsbypost/:postId',
  getAllCommentsByPostIdController
);

export default commentRouter;
