import express from 'express';
import { verifyAuthUserMiddleware } from '../MIDDLEWARE/verifyAuthUser.js';
import {
  createNewPostController,
  getAllPostController,
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

export default postRouter;
