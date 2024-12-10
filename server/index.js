// ~ Import Modules
import express from 'express';
const app = express();

// ~ Import Dotenv
import dotenv from 'dotenv';

// ~ Import ConnectDB
import connectDb from './DB/dbConnect.js';
import userRouter from './ROUTES/userRoutes.js';
import authRouter from './ROUTES/authRoutes.js';
// import { errorMiddleware } from './MIDDLEWARE/errorMiddleware.js';

// & Configure dotenv variable
dotenv.config();

// & Connect with DB
connectDb();

// & Listen Port
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));

// & Middleware
app.use(express.json());

// & All Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// & Error Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal server error';

  res
    .status(statusCode)
    .json({ message: errorMessage, success: false, statusCode: statusCode });
});

// $ Listen app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
