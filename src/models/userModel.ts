import { Request } from 'express';

export interface IUser {
  id: string;
  google_id: string | null;
}

export interface IGetUserReq extends Request<{ id: string }> {}
export interface IGetUserByGoogleIdReq extends Request<{ google_id: string }> {}
export interface IRegisterUserByGoogleReq extends Request {}
