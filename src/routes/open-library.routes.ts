import { Router } from "express";
import { Perfil } from "@prisma/client";
import { authMiddleware } from "../middleware/auth.middleware";
import { perfilMiddleware } from "../middleware/perfil.middleware";
import { OpenLibraryController } from "../controller/open-library.controller";

const router = Router();
const openLibraryController = new OpenLibraryController();

router.use(authMiddleware);

router.get(
  "/search",
  perfilMiddleware(Perfil.ADMIN),
  openLibraryController.search,
);

export { router as openLibraryRoutes };
