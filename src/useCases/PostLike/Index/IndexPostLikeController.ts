import { Request, Response, NextFunction } from 'express';
import IndexPostLikeUseCase from './IndexPostLikeUseCase';

export default class IndexPostLikeController {
  constructor(private indexPostLikeUseCase: IndexPostLikeUseCase) {}

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
      const {
        postLikes,
        count,
        pages,
      } = await this.indexPostLikeUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        userId: userId as string | undefined,
        postId: postId as string | undefined,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(postLikes);
    } catch (error) {
      return next(error);
    }
  }
}
