import 'dotenv/config';
import express, { Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';

import errorHandlerMiddleware from './middlewares/errorHandler';

import router from './router';

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 60,
  max: 100,
});

app.use(limiter);

app.use('/static', express.static('public'));

app.use('/api', router);

app.get('/', (_req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, 'views/index.html')),
);

app.use(errorHandlerMiddleware);

export default app;
