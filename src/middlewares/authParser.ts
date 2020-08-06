import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import SessionsRepository from '../repositories/implementations/RevocationsRepository';
import UsersRepository from '../repositories/implementations/UsersRepository';

import RequestError from '../utils/RequestError';

export default async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next();
  }

  try {
    const [method, token] = (authorization as string).split(' ');

    if (method !== 'Bearer' || !token) {
      throw RequestError.INVALID_TOKEN;
    }

    const sessionsRepository = new SessionsRepository();

    const revokedToken = await sessionsRepository.findByToken(token);

    if (revokedToken) {
      throw RequestError.TOKEN_REVOKED;
    }

    const { id } = jwt.verify(token, process.env.SECRET || 'DEFAULT') as {
      id: string;
    };

    if (!id) {
      throw RequestError.INVALID_TOKEN;
    }

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw RequestError.INVALID_TOKEN;
    }

    request.headers.token = token;
    request.headers.authorization = JSON.stringify(user);

    return next();
  } catch (error) {
    return next(error);
  }
};
