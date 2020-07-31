import { Request, Response, NextFunction } from 'express';
import SessionCreateUseCase from './SessionCreateUseCase';

export default class SessionCreateController {
  constructor(private sessionCreateUseCase: SessionCreateUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = request.body;

    try {
      const { token, user } = await this.sessionCreateUseCase.execute({
        email,
        password,
      });

      return response.status(201).send({ token, user });
    } catch (error) {
      return next(error);
    }
  }
}
