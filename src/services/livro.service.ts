import { EstadoLivro, StatusLivro } from "@prisma/client";
import { prisma } from "../prisma/client";

export class LivroService {
  async create(dados: {
    titulo: string;
    autor: string;
    descricao: string;
    imagem: string;
    preco: number;
    estado: EstadoLivro;
  }) {
    await prisma.livro.create({
      data: {
        ...dados,
        status: StatusLivro.DISPONIVEL,
      },
    });
  }

  async delete(id: number) {
    await prisma.livro.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await prisma.livro.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return await prisma.livro.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dados: {
    titulo?: string;
    autor?: string;
    descricao?: string;
    imagem?: string;
    preco?: number;
    estado?: EstadoLivro;
    status?: StatusLivro;
  }) {
    await prisma.livro.update({
      where: {
        id,
      },
      data: dados,
    });
  }
}

