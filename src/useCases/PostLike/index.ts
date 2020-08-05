import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { indexPostLikeController } from './Index';
import { findPostLikeController } from './Find';
import { createPostLikeController } from './Create';
import { deletePostLikeController } from './Delete';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number().integer().positive().optional().default(1),
      'per-page': Joi.number().integer().positive().optional().default(10),
      'user-id': Joi.string().max(36).optional(),
      'post-id': Joi.string().max(36).optional(),
    }).oxor('user-id', 'post-id'),
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexPostLikeController.handle(request, response, next),
);

router.get(
  '/:userId/:postId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().max(36).required(),
      postId: Joi.string().max(36).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findPostLikeController.handle(request, response, next),
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
    await createPostLikeController.handle(request, response, next),
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
    await deletePostLikeController.handle(request, response, next),
);

export default router;
