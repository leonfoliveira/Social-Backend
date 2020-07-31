import { Router, Request, Response } from 'express';

import userRouter from './useCases/User';
import sessionRouter from './useCases/Session';

const router = Router();

router.get('/ping', (req: Request, res: Response) =>
  res.json({ message: 'pong' }),
);

router.use('/users', userRouter);

router.use('/sessions', sessionRouter);

export default router;
