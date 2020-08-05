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

    const file = request.file;

    const { id: authorId } = JSON.parse(authorization as string);

    try {
      const user = await this.createPostUseCase.execute({
        authorId,
        text,
        image: file?.path,
      });

      return response.status(201).send(user);
    } catch (error) {
      return next(error);
    }
  }
}
