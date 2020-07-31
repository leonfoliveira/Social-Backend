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

    try {
      const user = await this.updateUserUseCase.handle({
        authId,
        id,
        email,
        name,
        password,
      });

      return response.send(user);
    } catch (error) {
      return next(error);
    }
  }
}
