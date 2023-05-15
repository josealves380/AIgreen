import dayjs from "dayjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToKenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {

  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken) {
      throw new Error("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs(). isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateToKenProvider = new GenerateToKenProvider();
    const token = await generateToKenProvider.execute(refreshToken.userId);

    if(refreshTokenExpired) {
await client.refreshToken.deleteMany({
  where: {
    userId: refreshToken.userId
  }
})
      const generateRefreshToKenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshToKenProvider.execute(refreshToken.userId)

      return{ token, newRefreshToken}
    }  

    return { token };
  }
}

export { RefreshTokenUserUseCase}