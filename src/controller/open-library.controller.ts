import { Request, Response } from "express";
import { OpenLibraryService } from "../services/open-library.service";

const openLibraryService = new OpenLibraryService();

export class OpenLibraryController {
  async search(req: Request, res: Response) {
    try {
      const q = String(req.query.q ?? "");

      const livros = await openLibraryService.search(q);

      res.status(200).json(livros);
    } catch {
      res.status(400).json({
        message: "Erro ao buscar livros",
      });
    }
  }
}

