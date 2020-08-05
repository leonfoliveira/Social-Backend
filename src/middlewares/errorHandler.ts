import { Request, Response, NextFunction } from 'express';
import { isCelebrate } from 'celebrate';
import fs from 'fs';
import RequestError from '../utils/RequestError';

export default (
  error: RequestError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  if (res.headersSent) {
    return next(error);
  }

  if (isCelebrate(error)) {
    error.status = 400;
  }

  return res.status(error.status || 500).send({ error: error.message });
};
