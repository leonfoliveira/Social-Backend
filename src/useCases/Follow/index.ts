import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { indexFollowController } from './Index';
import { findFollowController } from './Find';
import { createFollowController } from './Create';
import { deleteFollowController } from './Delete';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number().integer().positive().optional().default(1),
      'per-page': Joi.number().integer().positive().optional().default(10),
      'follower-id': Joi.string().max(36).optional(),
      'target-id': Joi.string().max(36).optional(),
    }).oxor('follower-id', 'target-id'),
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexFollowController.handle(request, response, next),
);

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

router.delete(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().max(36).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await deleteFollowController.handle(request, response, next),
);

export default router;
