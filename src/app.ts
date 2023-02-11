import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import routes from "./routes";
import connect from "./utils/connect";
import logger from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";

const app: Express = express();
const port = 3000;
//body parser
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`listen http://localhost:3000/ ons port ${port}`);
  await connect();

  routes(app);
});
