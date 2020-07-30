import 'dotenv/config';
import express from 'express';

import router from './router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;
