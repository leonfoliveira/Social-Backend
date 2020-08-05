import { Router, Request, Response } from 'express';

import commentRouter from './useCases/Comment';
import commentLikeRouter from './useCases/CommentLike';
import followRouter from './useCases/Follow';
import postLikeRouter from './useCases/PostLike';
import postRouter from './useCases/Post';
import userRouter from './useCases/User';
import sessionRouter from './useCases/Session';

const router = Router();

router.get('/ping', (_req: Request, res: Response) =>
  res.json({ message: 'pong' }),
);

router.use('/comments', commentRouter);
router.use('/comment-likes', commentLikeRouter);
router.use('/follows', followRouter);
router.use('/post-likes', postLikeRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/sessions', sessionRouter);

export default router;
