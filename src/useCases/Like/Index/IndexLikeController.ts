import { Request, Response, NextFunction } from 'express';
import IndexLikeUseCase from './IndexLikeUseCase';

export default class IndexLikeController {
  constructor(private indexLikeUseCase: IndexLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page } = request.query;
    const perPage = request.query['per-page'];
    const userId = request.query['user-id'];
    const postId = request.query['post-id'];

    try {
      const { likes, count, pages } = await this.indexLikeUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        userId: userId as string | undefined,
        postId: postId as string | undefined,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(likes);
    } catch (error) {
      return next(error);
    }
  }
}
