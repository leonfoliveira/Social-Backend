import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { indexCommentController } from './Index';
import { findCommentController } from './Find';
import { createCommentController } from './Create';
import { updateCommentController } from './Update';
import { deleteCommentController } from './Delete';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().positive().optional().default(1),
      'per-page': Joi.number()
        .integer()
        .positive()
        .max(30)
        .optional()
        .default(10),
      'user-id': Joi.string().optional(),
      'post-id': Joi.string().optional(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexCommentController.handle(request, response, next),
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().max(36),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findCommentController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      postId: Joi.string().max(36).required(),
      text: Joi.string().max(256).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createCommentController.handle(request, response, next),
);

router.put(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().max(36),
    },
    [Segments.BODY]: {
      text: Joi.string().max(256).optional(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await updateCommentController.handle(request, response, next),
);

router.delete(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().max(36),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await deleteCommentController.handle(request, response, next),
);

export default router;
