import express from 'express';
import { signUpController } from '../CONTROLLERS/authControllers.js';

const authRouter = express.Router();

authRouter.post('/signup', signUpController);

export default authRouter;
