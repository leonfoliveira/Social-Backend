import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { indexCommentLikeController } from './Index';
import { findCommentLikeController } from './Find';
import { createCommentLikeController } from './Create';
import { deleteCommentLikeController } from './Delete';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number().integer().positive().optional().default(1),
      'per-page': Joi.number().integer().positive().optional().default(10),
      'user-id': Joi.string().max(36).optional(),
      'comment-id': Joi.string().max(36).optional(),
    }).oxor('user-id', 'comment-id'),
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexCommentLikeController.handle(request, response, next),
);

router.get(
  '/:userId/:commentId',
  celebrate({
    [Segments.PARAMS]: {
      userId: Joi.string().max(36).required(),
      commentId: Joi.string().max(36).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findCommentLikeController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      commentId: Joi.string().max(36).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createCommentLikeController.handle(request, response, next),
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
    await deleteCommentLikeController.handle(request, response, next),
);

export default router;
