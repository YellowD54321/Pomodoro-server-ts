import { Request } from "express";

export interface IUser {
  id: number;
  google_id?: string;
}

export interface IGetUserReq extends Request<{ id: IUser["id"] }> {}
export interface IGetUserByGoogleIdReq
  extends Request<{ google_id: IUser["google_id"] }> {}
export interface IRegisterUserByGoogleReq extends Request {}
