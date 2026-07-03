import { Perfil } from "@prisma/client";

export interface AuthPayload {
  id: number;
  email: string;
  perfil: Perfil;
}

