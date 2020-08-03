import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { findLikeController } from './Find';
import { createLikeController } from './Create';

const router = Router();

router.get(
  '/:userId/:postId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().max(36).required(),
      postId: Joi.string().max(36).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findLikeController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      postId: Joi.string().max(36).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createLikeController.handle(request, response, next),
);

export default router;
