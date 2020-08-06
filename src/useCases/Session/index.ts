import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authParser from '../../middlewares/authParser';

import { findSessionController } from './Find';
import { createSessionController } from './Create';
import { deleteSessionController } from './Delete';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await findSessionController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(8).max(30).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await createSessionController.handle(request, response, next),
);

router.delete(
  '/:token',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: {
      token: Joi.string().required(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await deleteSessionController.handle(request, response, next),
);

export default router;
