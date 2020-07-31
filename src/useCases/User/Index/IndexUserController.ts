import { Request, Response, NextFunction } from 'express';
import IndexUserUseCase from './IndexUserUseCase';

export default class IndexUserController {
  constructor(private indexUserUseCase: IndexUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page } = request.query as { page: string };

    try {
      const { users, count, pages } = await this.indexUserUseCase.execute({
        page: parseInt(page, 10),
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(users);
    } catch (error) {
      return next(error);
    }
  }
}
