import express from 'express';
import {
  createCommentController,
  // getAllCommentedUserIdsByPostIdController,
  getAllCommentsByPostIdController,
  likeUnLikeCommentController,
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

commentRouter.put(
  '/likecomment/:commentId',
  verifyAuthUserMiddleware,
  likeUnLikeCommentController
);

export default commentRouter;
