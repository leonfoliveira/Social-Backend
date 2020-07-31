import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { indexUserController } from './Index';
import { createUserController } from './Create';

const router = Router();

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().positive().required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexUserController.handle(request, response, next),
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(50).required(),
      name: Joi.string().max(50).required(),
      tag: Joi.string().alphanum().max(30).required(),
      password: Joi.string().min(8).max(30).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await createUserController.handle(request, response, next),
);

export default router;
