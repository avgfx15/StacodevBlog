import express from 'express';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';
import {
  createNewPostController,
  getAllPostController,
  deletePostController,
  updatePostController,
  getPostByPostIdController,
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

// / Get Post By Id
postRouter.get('/getpost/:postId', getPostByPostIdController);

// * Update Post By author by postId
postRouter.put(
  '/updatepost/:postId/:userId',
  verifyAuthUserMiddleware,
  updatePostController
);

export default postRouter;
