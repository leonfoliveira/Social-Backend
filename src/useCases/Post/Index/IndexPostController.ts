import { Request, Response, NextFunction } from 'express';
import IndexPostUseCase from './IndexPostUseCase';

export default class IndexPostController {
  constructor(private indexPostUseCase: IndexPostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page, authorId } = request.query;

    try {
      const { posts, count, pages } = await this.indexPostUseCase.execute({
        page: parseInt(page as string, 10),
        authorId: authorId ? (authorId as string) : undefined,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.status(200).send(posts);
    } catch (error) {
      return next(error);
    }
  }
}