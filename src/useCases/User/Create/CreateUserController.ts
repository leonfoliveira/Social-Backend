import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, tag, name, password } = request.body;

    try {
      await this.createUserUseCase.execute({
        email,
        tag,
        name,
        password,
      });

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  }
}
