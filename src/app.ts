import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";
import createServer from "./utils/server";
import config from "config";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`listen http://localhost:3000/ ons port ${port}`);
  await connect();
});
