import { Request, Response } from "express";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate the user password

  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("invalid email or password");
  }

  //create a session

  const session = await createSession(user._id, req.get("user-agent") || "");

  //create an access token

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("acessTokenTtl") } //15minuts
  );

  //create a refresh token

  const refreshTOken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") } //1y
  );

  //return access and refresh tokens

  return res.send({ accessToken, refreshTOken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSession({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
