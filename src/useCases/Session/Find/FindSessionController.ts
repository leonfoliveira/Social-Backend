import { Request, Response, NextFunction } from 'express';
import FindSessionUseCase from './FindSessionUseCase';

export default class FindSessionController {
  constructor(private findSessionUseCase: FindSessionUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      const user = await this.findSessionUseCase.execute({
        authId,
      });

      return response.send(user);
    } catch (error) {
      return next(error);
    }
  }
}
