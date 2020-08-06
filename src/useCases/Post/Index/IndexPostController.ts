import { Request, Response, NextFunction } from 'express';
import IndexPostUseCase from './IndexPostUseCase';

export default class IndexPostController {
  constructor(private indexPostUseCase: IndexPostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { page, slug } = request.query;
    const perPage = request.query['per-page'];
    const authorId = request.query['author-id'];

    try {
      const { posts, count, pages } = await this.indexPostUseCase.execute({
        page: parseInt(page as string, 10),
        perPage: parseInt(perPage as string, 10),
        authorId: authorId ? (authorId as string) : undefined,
        slug: slug as string,
      });

      response.header('X-Total-Count', count.toString());
      response.header('X-Total-Pages', pages.toString());

      return response.status(200).send(posts);
    } catch (error) {
      return next(error);
    }
  }
}
