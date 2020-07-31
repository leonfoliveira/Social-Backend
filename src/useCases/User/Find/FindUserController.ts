import { Request, Response, NextFunction } from 'express';
import FindUserUseCase from './FindUserUseCase';

export default class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;

    try {
      const user = await this.findUserUseCase.execute({ id });

      return response.send(user);
    } catch (error) {
      return next(error);
    }
  }
}
