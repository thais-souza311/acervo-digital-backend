import { Router } from "express";
import { Perfil } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware";
import { CompraController } from "../controller/compra.controller";
import { perfilMiddleware } from "../middleware/perfil.middleware";

const router = Router();
const compraController = new CompraController();

router.use(authMiddleware);
router.use(perfilMiddleware(Perfil.USER));

router.post("/", compraController.create);
router.get("/", compraController.findAll);

export { router as compraRoutes };
