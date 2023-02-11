import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // const user = await //call create user service
    const user = await createUser(req.body);
    const userOmitPassword = omit(user.toJSON(), "password");
    return res.send(userOmitPassword);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
