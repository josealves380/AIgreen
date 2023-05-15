import { Response, Request } from "express";
import { AuthenticateUser } from "./AuthenticateUser";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const {email, senha} = request.body;

    const authenticateUser = new AuthenticateUser();

    const token = await authenticateUser.execute({
      email,
      senha,         
    });
    return response.json(token);
  }
}

export { AuthenticateUserController}