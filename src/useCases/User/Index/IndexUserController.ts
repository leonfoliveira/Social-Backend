import { Request, Response, NextFunction } from 'express';
import IndexUserUseCase from './IndexUserUseCase';

export default class IndexUserController {
  constructor(private indexUserUseCase: IndexUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page, slug } = request.query;
    const perPage = request.query['per-page'];

    try {
      const { users, count, pages } = await this.indexUserUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        slug: slug as string,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(users);
    } catch (error) {
      return next(error);
    }
  }
}
