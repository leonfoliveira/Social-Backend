import { Request, Response, NextFunction } from 'express';
import IndexCommentLikeUseCase from './IndexCommentLikeUseCase';

export default class IndexCommentLikeController {
  constructor(private indexCommentLikeUseCase: IndexCommentLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page } = request.query;
    const perPage = request.query['per-page'];
    const userId = request.query['user-id'];
    const commentId = request.query['comment-id'];

    try {
      const {
        commentLikes,
        count,
        pages,
      } = await this.indexCommentLikeUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        userId: userId as string | undefined,
        commentId: commentId as string | undefined,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.send(commentLikes);
    } catch (error) {
      return next(error);
    }
  }
}
