import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/userRoutes";
import cors from "cors";
import authorize from "./middlewares/auth";
import DurationRouter from "./routes/durationRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors<Request>());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/v1/user", UserRouter);

app.use(authorize);

app.use("/v1/durations", DurationRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
