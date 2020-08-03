import { Request, Response, NextFunction } from 'express';
import CreateLikeUseCase from './CreateLikeUseCase';

export default class CreateLikeController {
  constructor(private createLikeUseCase: CreateLikeUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { postId } = request.body;

    const { id: userId } = JSON.parse(authorization as string);

    try {
      const like = await this.createLikeUseCase.execute({
        userId,
        postId,
      });

      return response.status(201).send(like);
    } catch (error) {
      return next(error);
    }
  }
}
