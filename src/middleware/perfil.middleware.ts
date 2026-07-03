import { Perfil } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../tipos/auth-payload";

export function perfilMiddleware(perfil: Perfil) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user as AuthPayload;

    if (!user || user.perfil !== perfil) {
      return res.status(403).json({
        message: "Acesso negado",
      });
    }

    next();
  };
}

