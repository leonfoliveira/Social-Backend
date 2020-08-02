import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { findFollowController } from './Find';
import { createFollowController } from './Create';

const router = Router();

router.get(
  '/:followerId/:targetId',
  celebrate({
    [Segments.PARAMS]: {
      followerId: Joi.string().max(36).required(),
      targetId: Joi.string().max(36).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findFollowController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      targetId: Joi.string().max(36).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createFollowController.handle(request, response, next),
);

export default router;
