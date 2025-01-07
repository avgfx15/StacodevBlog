import express from 'express';
const commentRouter = express.Router();

// ~ Import Controlles
import {
  createCommentController,
  deleteCommentByCommentIdController,
  editCommentController,
  getAllCommentsByPostIdController,
  getAllCommentsController,
  likeUnLikeCommentController,
} from '../CONTROLLERS/commentController.js';

// ~ Import Middlewares
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';

// + Create Comment By LoggedIn User route
commentRouter.post(
  '/create',
  verifyAuthUserMiddleware,
  createCommentController
);

// / Get All Comment By Post Id
commentRouter.get(
  '/allcommentsbypost/:postId',
  getAllCommentsByPostIdController
);

// + like Or Unlike comment By LoggedIn User By comment Id
commentRouter.put(
  '/likecomment/:commentId',
  verifyAuthUserMiddleware,
  likeUnLikeCommentController
);

// * Update comment By owner or Admin by Comment Id
commentRouter.put(
  '/editcomment/:commentId',
  verifyAuthUserMiddleware,
  editCommentController
);

// - Delete Comment BY Owner or Admin by comment Id
commentRouter.delete(
  '/deletecomment/:commentId',
  verifyAuthUserMiddleware,
  deleteCommentByCommentIdController
);

// / Get All Comments
commentRouter.get(
  '/allcomments',
  verifyAuthUserMiddleware,
  getAllCommentsController
);

export default commentRouter;
