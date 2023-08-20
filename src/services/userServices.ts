import { testUserId } from "../config";
import { IUser } from "../models/userModel";
import { UserQueries } from "../queries/userQueries";
import * as db from "./db";

export const getUserById = async (userId: IUser["id"]) => {
  return db.query<IUser>(UserQueries.GetUserById, [userId]);
};

export const getUserByGoogleId = async (googleId: IUser["google_id"]) => {
  return await db.query<IUser[]>(UserQueries.GetUserByGoogleId, [googleId]);
};

export const registerUserByGoogle = async (googleId: IUser["google_id"]) => {
  const result = await db.query<{ affectedRows: number }>(
    UserQueries.RegisterUserByGoogleId,
    [googleId]
  );
  return result.affectedRows > 0;
};

export const getTestAccountUser = async () => {
  return db.query<IUser[]>(UserQueries.GetUserById, [testUserId]);
};

export const registerTestAccount = async () => {
  const result = await db.query<{ affectedRows: number }>(
    UserQueries.RegisterTestAccount,
    [testUserId]
  );
  return result.affectedRows > 0;
};
