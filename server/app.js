import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import rateLimiter from 'express-rate-limit';
import { errorHandler } from './src/middleware/errorHandler.js';

import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './src/routes/user.routes.js';
import noteRoutes from './src/routes/notes.routes.js'
import responseHandler from './src/middleware/responseHandler.js';



const app = express();



// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());


const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 10 requests per windowMs
});

app.use(limiter);
app.use(responseHandler)

app.get('/', (req, res) => {
    res.send('welcome!');
});

app.use ('/api/v1/user', userRoutes);
app.use ('/api/v1/note', noteRoutes)
app.use (errorHandler);


export default app;