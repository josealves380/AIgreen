import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, nivel } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.user.create({
      data: {
        name,
        email,
        nivel,
        senha: passwordHash,
        status: true,
        bloqueio: false,
      },
    });
    return res.status(201).json({ name, email, senha });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};






