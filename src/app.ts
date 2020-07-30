import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import errorHandlerMiddleware from './middlewares/errorHandler';

import router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorHandlerMiddleware);

export default app;
