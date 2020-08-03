import { Router, Request, Response } from 'express';

import followRouter from './useCases/Follow';
import likeRouter from './useCases/Like';
import postRouter from './useCases/Post';
import userRouter from './useCases/User';
import sessionRouter from './useCases/Session';

const router = Router();

router.get('/ping', (_req: Request, res: Response) =>
  res.json({ message: 'pong' }),
);

router.use('/follows', followRouter);
router.use('/likes', likeRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/sessions', sessionRouter);

export default router;
