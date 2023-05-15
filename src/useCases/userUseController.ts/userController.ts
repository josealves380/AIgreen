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
export const createUserParceiro = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, nivel, id } = req.body;
    const passwordHash = await hash(senha, 8);
    await prisma.user.create({
      data: {
        name,
        email,
        nivel,
        senha: passwordHash,
        status: true,
        bloqueio: false,
        parceiro: {
          connect: {
            id,
          },
        },
      },
    });
    return res.status(201).json({ name, email, senha });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Falha ao criar user tente novamente");
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            nivel: "",
          },
          AND: [
            {
              NOT: {
                nivel: "1",
              },
              AND: [
                {
                  NOT: {
                    nivel: "2",
                  },
                  AND: [
                    {
                      NOT: {
                        nivel: "3",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(user);
};
export const getUserParsa = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            nivel: "",
          },
          AND: [
            {
              NOT: {
                nivel: "1",
              },
              AND: [
                {
                  NOT: {
                    nivel: "3",
                  },
                  AND: [
                    {
                      NOT: {
                        nivel: "4",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(user);
};
export const getUserSuporte = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            nivel: "",
          },
          AND: [
            {
              NOT: {
                nivel: "1",
              },
              AND: [
                {
                  NOT: {
                    nivel: "2",
                  },
                  AND: [
                    {
                      NOT: {
                        nivel: "4",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(user);
};
export const getUserCliente = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  const user = await prisma.user.findMany({
    where: {
      parceiro_id: Number(parceiro_id),
      AND: [
        {
          NOT: {
            nivel: "1",
          },
          AND: [
            {
              NOT: {
                nivel: "2",
              },
              AND: [
                {
                  NOT: {
                    nivel: "3",
                  },
                  AND: [
                    {
                      NOT: {
                        nivel: "",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(user);
};

export const getUserCount = async (req: Request, res: Response) => {
  const count = await prisma.user.count();
  return res.status(201).json(count);
};
export const getCountParsa = async (req: Request, res: Response) => {
  const count = await prisma.user.count({
    where: {
      nivel: "2",
    },
  });
  return res.status(201).json(count);
};
export const getCountSuporte = async (req: Request, res: Response) => {
  const count = await prisma.user.count({
    where: {
      nivel: "3",
    },
  });
  return res.status(201).json(count);
};

export const userNivel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const nivel = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
    select: {
      nivel: true,
    },
  });
  return res.json(nivel);
};
export const userNivelEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const nivel = await prisma.user.findUnique({
    where: {
      email: String(email),
    },
    select: {
      nivel: true,
    },
  });
  return res.json(nivel);
};

export const userNome = async (req: Request, res: Response) => {
  const { id } = req.params;
  const nivel = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
    select: {
      name: true,
    },
  });
  return res.json(nivel);
};

export const userPutId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        status: true,
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: { status: !userData?.status },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não existe usuario com esse id${id}` });
  }
};

export const userPutIdBloqueio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      select: {
        bloqueio: true,
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: { bloqueio: !userData?.bloqueio },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não existe usuario com esse id${id}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
    });
    const updatedUser = await prisma.user.update({
      where: { id: String(id) || undefined },
      data: {
        nivel: "",
        status: false,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: `Não foi possível deletar esse usuário` });
  }
};

export const getSeachUser = async (req: Request, res: Response) => {
  const { consulta } = req.body;
  const cliente = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: consulta,
          },
        },
        {
          OR: [
            {
              email: {
                startsWith: consulta,
              },
            },
            {
              OR: [
                {
                  nivel: {
                    startsWith: consulta,
                  },
                },
              ],
              AND: [
                {
                  NOT: {
                    nivel: "1",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(cliente);
};

export const getSeachUserParceiro = async (req: Request, res: Response) => {
  const { parceiro_id } = req.params;
  const { consulta } = req.body;
  const cliente = await prisma.user.findMany({
    where: {
      parceiro_id: Number(parceiro_id),
      OR: [
        {
          name: {
            startsWith: consulta,
          },
        },
        {
          OR: [
            {
              email: {
                startsWith: consulta,
              },
            },
            {
              OR: [
                {
                  nivel: {
                    startsWith: consulta,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  });
  return res.json(cliente);
};
