import { Request, Response } from "express";
import { CompraService } from "../services/compra.service";
import { AuthPayload } from "../tipos/auth-payload";

const compraService = new CompraService();

export class CompraController {
  async create(req: Request, res: Response) {
    try {
      const user = res.locals.user as AuthPayload;
      const { livroId } = req.body;

      await compraService.create(Number(livroId), user.id);

      res.status(200).send();
    } catch (error) {
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Erro",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const user = res.locals.user as AuthPayload;

    const compras = await compraService.findAll(user.id);

    res.status(200).json(compras);
  }
}

