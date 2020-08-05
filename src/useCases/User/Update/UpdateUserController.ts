import { Request, Response, NextFunction } from 'express';
import UpdateUserUseCase from './UpdateUserUseCase';

export default class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;
    const { email, name, password } = request.body;

    const { id: authId } = JSON.parse(authorization as string);

    const file = request.file;

    try {
      const user = await this.updateUserUseCase.execute({
        authId,
        id,
        email,
        name,
        password,
        image: file?.path,
      });

      return response.send(user);
    } catch (error) {
      return next(error);
    }
  }
}
