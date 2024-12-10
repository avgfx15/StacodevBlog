// ~ Import Modules
import express from 'express';

// ~ Import Dotenv
import dotenv from 'dotenv';

// ~ Import ConnectDB
import connectDb from './DB/dbConnect.js';

// & Configure dotenv variable
dotenv.config();
const app = express();

// & Connect with DB
connectDb();

// & Listen Port
const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
