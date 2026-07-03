import { Perfil } from "@prisma/client";
import { Router } from "express";
import { LivroController } from "../controller/livro.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { perfilMiddleware } from "../middleware/perfil.middleware";

const router = Router();
const livroController = new LivroController();

router.use(authMiddleware);

router.post("/", perfilMiddleware(Perfil.ADMIN), livroController.create);
router.delete("/:id", perfilMiddleware(Perfil.ADMIN), livroController.delete);
router.get("/", livroController.findAll);
router.get("/:id", livroController.findById);
router.put("/:id", perfilMiddleware(Perfil.ADMIN), livroController.update);

export { router as livroRoutes };

