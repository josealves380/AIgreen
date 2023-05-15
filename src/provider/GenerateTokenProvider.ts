import { sign } from "jsonwebtoken";

 class GenerateToKenProvider {
  async execute(userId: string) {
    const token = sign({}, "acb5ebba-5578-4e52-b03f-910f3e45c269", {
      subject: userId,
      expiresIn: "100 years"
    } );

    return token;
  }
 }
 export {GenerateToKenProvider}