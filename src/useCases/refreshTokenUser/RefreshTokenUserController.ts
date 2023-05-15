import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const {refresh_token} = request.body;

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
    const token = await refreshTokenUserUseCase.execute(refresh_token);

    return response.json(token);
  }
}

export const deleteRefreshToken = async( req: Request, res: Response) => {
  const {id} = req.params
  try {
    const userData = await prisma.refreshToken.findUnique({
      where: {
        id: String(id)
      },      
    })
    const updatedUser = await prisma.refreshToken.delete({
      where: {id: String(id) || undefined },      
    })
    res.json(updatedUser)
  }catch (error) {
    res.json({error: `Não foi possível deletar esse refresh token`})
  }
}
export {RefreshTokenUserController};