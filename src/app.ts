import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes";
import { livroRoutes } from "./routes/livro.routes";
import { compraRoutes } from "./routes/compra.routes";
import { openLibraryRoutes } from "./routes/open-library.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/livros", livroRoutes);
app.use("/compras", compraRoutes);
app.use("/open-library", openLibraryRoutes);

export { app };
