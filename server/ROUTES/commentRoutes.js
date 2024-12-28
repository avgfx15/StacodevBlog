import express from 'express';
import { createCommentController } from '../CONTROLLERS/commentController.js';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';

const commentRouter = express.Router();

commentRouter.post(
  '/create',
  verifyAuthUserMiddleware,
  createCommentController
);

export default commentRouter;
