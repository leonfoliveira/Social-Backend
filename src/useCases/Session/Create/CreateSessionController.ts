import { Request, Response, NextFunction } from 'express';
import CreateSessionUseCase from './CreateSessionUseCase';

export default class CreateSessionController {
  constructor(private createSessionUseCase: CreateSessionUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = request.body;

    try {
      const { token, user } = await this.createSessionUseCase.execute({
        email,
        password,
      });

      return response.status(201).send({ token, user });
    } catch (error) {
      return next(error);
    }
  }
}
