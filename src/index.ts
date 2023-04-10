import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { itemsRouter } from "./routes/itemsRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/items", itemsRouter);

const PORT: number = parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
