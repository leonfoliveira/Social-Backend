import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import authParser from '../../middlewares/authParser';

import { feedPostController } from './Feed';
import { trendPostController } from './Trend';
import { indexPostController } from './Index';
import { findPostController } from './Find';
import { createPostController } from './Create';
import { updatePostController } from './Update';
import { deletePostController } from './Delete';

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
  '/feed',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
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
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await feedPostController.handle(request, response, next),
);

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
    await trendPostController.handle(request, response, next),
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
      'author-id': Joi.string().optional(),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await indexPostController.handle(request, response, next),
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().max(36),
    },
  }),
  async (request: Request, response: Response, next: NextFunction) =>
    await findPostController.handle(request, response, next),
);

router.post(
  '/',
  upload.single('image'),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: {
      text: Joi.string().max(256).optional(),
    },
  }),
  authParser,
  async (request: Request, response: Response, next: NextFunction) =>
    await createPostController.handle(request, response, next),
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
    await updatePostController.handle(request, response, next),
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
    await deletePostController.handle(request, response, next),
);

export default router;
