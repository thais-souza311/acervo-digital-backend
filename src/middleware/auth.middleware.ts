import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../tipos/auth-payload";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Nao autenticado",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;

    res.locals.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: "Token invalido",
    });
  }
}

