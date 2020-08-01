import { Request, Response, NextFunction } from 'express';
import FindPostUseCase from './FindPostUseCase';

export default class FindPostController {
  constructor(private findPostUseCase: FindPostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;

    try {
      const post = await this.findPostUseCase.execute({ id });

      return response.send(post);
    } catch (error) {
      return next(error);
    }
  }
}
