import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { sessionCreateController } from './Create';

const router = Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(8).max(30).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await sessionCreateController.handle(request, response, next),
);

export default router;
