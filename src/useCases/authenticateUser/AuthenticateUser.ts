import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToKenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
  email: string;
  senha: string; 
}

 class AuthenticateUser {
  async execute({email, senha}: IRequest) {
    //verifica se usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,           
      }
    });
    if(!userAlreadyExists) {
      throw new Error("Email ou senha incorreto");
    }    
    //verificar se a senha esta correta
    const passwordMatch = await compare(senha, userAlreadyExists.senha)

    if(!passwordMatch) {
      throw new Error("Email ou password incorrect");
    }    
    //gerar token do usuario
   const generateToKenProvider = new GenerateToKenProvider();
   const token = await generateToKenProvider.execute(userAlreadyExists.id);

   await client.refreshToken.deleteMany ({
    where: {
      userId: userAlreadyExists.id,
    }
   })
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );
    return {token, refreshToken};
  }
}

export {AuthenticateUser}