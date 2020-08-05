import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import authParser from '../../middlewares/authParser';

import { trendUserController } from './Trend';
import { indexUserController } from './Index';
import { findUserController } from './Find';
import { createUserController } from './Create';
import { updateUserController } from './Update';
import { deleteUserController } from './Delete';

import RequestError from '../../utils/RequestError';

const router = Router();

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (_req, file, cb) => {
    cb(null, `${new Date().getTime()}.${file.mimetype.replace('image/', '')}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 1 MB
  },
  fileFilter: (_req, file, cb) => {
    const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (mimetypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(RequestError.INVALID_FILE_EXTENSION);
    }
  },
});

router.get(
  '/trend',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().integer().positive().optional().default(1),
      'per-page': Joi.number()
        .integer()
        .positive()
        .max(30)
        .optional()
        .default(10),
      time: Joi.number()
        .integer()
        .positive()
        .max(31536000000)
        .optional()
        .default(86400000),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await trendUserController.handle(request, response, next),
);

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
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexUserController.handle(request, response, next),
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().max(36).required(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findUserController.handle(request, response, next),
);

router.post(
  '/',
  upload.single('image'),
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

router.put(
  '/:id',
  upload.single('image'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().max(36).required(),
    },
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      email: Joi.string().email().max(50).optional(),
      name: Joi.string().max(50).optional(),
      password: Joi.string().min(8).max(30).optional(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await updateUserController.handle(request, response, next),
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().max(36).required(),
    },
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await deleteUserController.handle(request, response, next),
);

export default router;
