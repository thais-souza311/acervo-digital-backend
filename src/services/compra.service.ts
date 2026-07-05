import { StatusLivro } from "@prisma/client";
import { prisma } from "../prisma/client";

export class CompraService {
  async create(livroId: number, userId: number) {
    const livro = await prisma.livro.findUnique({
      where: {
        id: livroId,
      },
    });

    if (!livro) {
      throw new Error("Livro nao encontrado");
    }

    if (livro.status === StatusLivro.INDISPONIVEL) {
      throw new Error("Livro indisponivel");
    }

    await prisma.compra.create({
      data: {
        livroId,
        userId,
        precoPago: livro.preco,
      },
    });

    await prisma.livro.update({
      where: {
        id: livroId,
      },
      data: {
        status: StatusLivro.INDISPONIVEL,
      },
    });
  }

  async findAll(userId: number) {
    return await prisma.compra.findMany({
      where: {
        userId,
      },
      include: {
        livro: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

