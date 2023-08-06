import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";
import { auth } from "../config";
import { IAuthToken } from "../models/authModel";
export const createAuthToken = (userId: IUser["id"]): IAuthToken => {
  const accessToken = jwt.sign({ id: userId }, auth.accessSecret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id: userId }, auth.refreshSecret, {
    expiresIn: "7d",
  });
  const token = {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
  return token;
};
