import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, name, tag, description, password } = request.body;

    const file = request.file;

    try {
      const user = await this.createUserUseCase.execute({
        email,
        tag,
        name,
        description,
        password,
        image: file?.path,
      });

      return response.status(201).send(user);
    } catch (error) {
      return next(error);
    }
  }
}
