import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  const dbUrl = process.env.DATABASE;

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUrl!);
    logger.info("db connected");
  } catch (error) {
    logger.error("cold not connect to db", error);
    process.exit(1);
  }
}

export default connect;
