import { Request, Response, NextFunction } from 'express';
import CreatePostLikeUseCase from './CreatePostLikeUseCase';

export default class CreatePostLikeController {
  constructor(private createPostLikeUseCase: CreatePostLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { postId } = request.body;

    const { id: userId } = JSON.parse(authorization as string);

    try {
      const postLike = await this.createPostLikeUseCase.execute({
        userId,
        postId,
      });

      return response.status(201).send(postLike);
    } catch (error) {
      return next(error);
    }
  }
}
