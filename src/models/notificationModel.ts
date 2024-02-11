import { Request } from 'express';
import { IUser } from './userModel';
import { IDuration } from './durationModel';

export interface INotification {
  id: string;
  receiver: IUser;
  receiver_id: string;
  sender: IUser;
  sender_id: string;
  post: IDuration | null;
  post_id: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetNotificationByParam {
  user_id: string;
}

export interface IGetNotificationsByParamReq
  extends Request<
    Record<string, never>,
    Record<string, never>,
    {
      user: IUser;
    },
    IGetNotificationByParam
  > {}

export interface ICreateNotificationByParam {
  receiver_id: string;
  sender_id: string;
  post_id?: string;
  content: string;
}
