import { Perfil } from "@prisma/client";
import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async create(email: string, senha: string) {
    const existeUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existeUser) {
      throw new Error("Erro ao criar usuario");
    }

    const senhaHashed = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        email,
        senha: senhaHashed,
        perfil: Perfil.USER,
      },
    });

    return {
      id: user.id,
      email: user.email,
      perfil: user.perfil,
    };
  }

  async login(email: string, senha: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuario ou senha invalido");
    }

    const senhaMatch = await bcrypt.compare(senha, user.senha);

    if (!senhaMatch) {
      throw new Error("Usuario ou senha invalido");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        perfil: user.perfil,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        perfil: user.perfil,
      },
    };
  }
}

