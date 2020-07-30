import { Request, Response, NextFunction } from 'express';
import { isCelebrate } from 'celebrate';
import RequestError from '../utils/RequestError';

export default (
  error: RequestError,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (res.headersSent) {
    return next(error);
  }

  if (isCelebrate(error)) {
    error.status = 400;
  }

  return res.status(error.status || 500).send({ error: error.message });
};
