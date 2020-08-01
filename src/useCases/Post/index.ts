import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { indexPostController } from './Index';
import { createPostController } from './Create';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().positive().required(),
      authorId: Joi.string().optional(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexPostController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      text: Joi.string().max(256).required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createPostController.handle(request, response, next),
);

export default router;
