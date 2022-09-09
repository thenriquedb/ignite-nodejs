import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

type AuthenticateUserControllerDTO = {
  email: string;
  password: string;
};

class AuthenticateUserController {
  async handle(
    request: Request<void, void, AuthenticateUserControllerDTO>,
    response: Response
  ) {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateInfo = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(authenticateInfo);
  }
}

export { AuthenticateUserController };
