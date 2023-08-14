import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./api/api.mjs";

dotenv.config();

if (!process.env["PORT"] || !process.env["AZURE_OPENAI_ENDPOINT"] || !process.env["AZURE_OPENAI_API_KEY"]) {
  console.log(`Missing environment variables. Please set the following environment variables: PORT, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY`);
  process.exit(1);
}

const PORT: number = parseInt(process.env["PORT"] as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
