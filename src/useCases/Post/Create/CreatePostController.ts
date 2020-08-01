import { Request, Response, NextFunction } from 'express';
import CreatePostUseCase from './CreatePostUseCase';

export default class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = request.headers;
    const { text } = request.body;

    const { id: authorId } = JSON.parse(authorization as string);

    try {
      await this.createPostUseCase.execute({
        authorId,
        text,
      });

      return response.status(201).send();
    } catch (error) {
      return next(error);
    }
  }
}
