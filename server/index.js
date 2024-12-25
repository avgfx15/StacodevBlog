// ~ Import Modules
import express from 'express';

// ~ Cookie - parser
import cookieParser from 'cookie-parser';

import multer from 'multer';
const app = express();

import cors from 'cors';

// ~ Import Dotenv
import dotenv from 'dotenv';

// ~ Import ConnectDB
import connectDb from './DB/dbConnect.js';
import userRouter from './ROUTES/userRoutes.js';
import authRouter from './ROUTES/authRoutes.js';
import postRouter from './ROUTES/postRoutes.js';

// & Configure dotenv variable
dotenv.config();

// & Connect with DB
connectDb();

// & Listen Port
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));

// & Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// & Cors middleware
app.use(cors());

// & CookieParser Middleware
app.use(cookieParser());

// & Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = new Date().getTime() + file.originalname;
    cb(null, uniqueFileName); // Append extension
  },
});

const upload = multer({ storage });

// + Create an endpoint to upload profile picture
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file; // Save the path to the file

  res.json(file.filename);
});

// & All Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

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
