import { Router, Request, Response } from 'express';

import userRouter from './useCases/User';

const router = Router();

router.get('/ping', (req: Request, res: Response) =>
  res.json({ message: 'pong' }),
);

router.use('/users', userRouter);

export default router;
