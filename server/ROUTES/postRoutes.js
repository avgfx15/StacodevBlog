import express from 'express';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';
import {
  createNewPostController,
  getAllPostController,
  deletePostController,
} from '../CONTROLLERS/postControllers.js';

const postRouter = express.Router();

// / Get All Post
postRouter.get('/getallposts', getAllPostController);

// + Create new Post
postRouter.post(
  '/createnewpost',
  verifyAuthUserMiddleware,
  createNewPostController
);

// - Delete Post By User
postRouter.delete(
  '/deletepost/:postId/:userId',
  verifyAuthUserMiddleware,
  deletePostController
);

export default postRouter;
