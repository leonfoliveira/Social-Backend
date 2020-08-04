import { Request, Response, NextFunction } from 'express';
import TrendPostUseCase from './TrendPostUseCase';

export default class TrendPostController {
  constructor(private trendPostUseCase: TrendPostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page, time } = request.query;
    const perPage = request.query['per-page'];

    try {
      const { posts, count, pages } = await this.trendPostUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        time: parseInt(time as string, 10),
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.status(200).send(posts);
    } catch (error) {
      return next(error);
    }
  }
}
