import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import qs from "qs";
import { cors } from "./config/cors";
import { httpLogger } from "./config/logger";
import { globalLimiter } from "./config/rate-limit";
import { apiRoutes } from "./routes";
import path from "path";
import { notFound } from "./shared/middlewares/notFound";
import { globalErrorHandler } from "./shared/middlewares/errorHandler";

const app: Application = express();

app.set("query parser", (str: string) => qs.parse(str));
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/templates`));

app.use(express.json());
app.use(helmet());
app.use(httpLogger);
app.use(cors);
app.use(globalLimiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    title: "Opperd APIs",
    description:
      "Built with Mordern Tech - A production-ready Express Server with TypeScript, security, and best practices.",
    version: "1.0.0",
    docs: "https://github.com/mahmud-reza-rafsun/opperd",
  });
});

app.use("/api/v1", apiRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export { app };
