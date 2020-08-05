import { Request, Response, NextFunction } from 'express';
import IndexCommentUseCase from './IndexCommentUseCase';

export default class IndexCommentController {
  constructor(private indexCommentUseCase: IndexCommentUseCase) {}

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
      const { comments, count, pages } = await this.indexCommentUseCase.execute(
        {
          page: parseInt(page as string, 10),
          perPage: parseInt(perPage as string, 10),
          userId: userId as string | undefined,
          postId: postId as string | undefined,
        },
      );

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(comments);
    } catch (error) {
      return next(error);
    }
  }
}
