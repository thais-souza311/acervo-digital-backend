import { Request, Response } from "express";
import { LivroService } from "../services/livro.service";

const livroService = new LivroService();

export class LivroController {
  async create(req: Request, res: Response) {
    try {
      const dados = req.body;

      await livroService.create(dados);

      res.status(200).send();
    } catch (error) {
      res.status(400).json({
        message: "Erro ao criar livro",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await livroService.delete(id);

      res.status(200).send();
    } catch {
      res.status(400).json({
        message: "Erro ao excluir livro",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;

      await livroService.update(id, dados);

      res.status(200).send();
    } catch {
      res.status(400).json({
        message: "Erro ao atualizar livro",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const livros = await livroService.findAll();

    res.status(200).json(livros);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const livro = await livroService.findById(id);

    res.status(200).json(livro);
  }
}

