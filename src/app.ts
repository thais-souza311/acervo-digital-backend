import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes";

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

export { app };
