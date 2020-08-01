import { Request, Response, NextFunction } from 'express';
import UpdatePostUseCase from './UpdatePostUseCase';

export default class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = request.params;
    const { authorization } = request.headers;
    const { text } = request.body;

    const { id: authId } = JSON.parse(authorization as string);

    try {
      const post = await this.updatePostUseCase.execute({
        authId,
        id,
        text,
      });

      return response.send(post);
    } catch (error) {
      return next(error);
    }
  }
}
