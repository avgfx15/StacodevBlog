import express from 'express';

// & Declare authRouter
const authRouter = express.Router();

// ~ Import Controllers
import {
  signUpController,
  signInController,
  googleSignInController,
} from '../CONTROLLERS/authControllers.js';

// & Routes
// + Add New User Route
authRouter.post('/signup', signUpController);

// / Signin Route
authRouter.post('/signin', signInController);

// / Signin Route With Google
authRouter.post('/google', googleSignInController);

export default authRouter;
