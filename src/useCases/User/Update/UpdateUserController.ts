import { Request, Response, NextFunction } from 'express';
import UpdateUserUseCase from './UpdateUserUseCase';

export default class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { email, name, description, password } = request.body;

    const { id } = JSON.parse(authorization as string);

    const file = request.file;

    try {
      const user = await this.updateUserUseCase.execute({
        id,
        email,
        name,
        description,
        password,
        image: file?.path,
      });

      return response.send(user);
    } catch (error) {
      return next(error);
    }
  }
}
