import { Request, Response, NextFunction } from 'express';
import TrendUserUseCase from './TrendUserUseCase';

export default class TrendUserController {
  constructor(private trendUserUseCase: TrendUserUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page } = request.query;
    const perPage = request.query['per-page'];

    try {
      const { users, count, pages } = await this.trendUserUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(users);
    } catch (error) {
      return next(error);
    }
  }
}
