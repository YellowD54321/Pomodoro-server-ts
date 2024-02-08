import { Request } from 'express';
import { IUser } from './userModel';

export type IDurationType = 'work' | 'rest';

export interface IDuration {
  id: number;
  user_id: number;
  start_time: string;
  end_time?: string;
  interrupt_times: number;
  focus_seconds: number;
  pause_seconds: number;
  type: IDurationType;
  description: string;
}

export interface IGetDurationByParams {
  user_id: IDuration['id'];
  begin_date?: string;
  end_date?: string;
  type?: IDuration['type'];
  description?: IDuration['description'];
}

export interface IGetDurationByParamsReq
  extends Request<
    Record<string, never>,
    Record<string, never>,
    {
      user: IUser;
    },
    IGetDurationByParams
  > {}
export interface IGetDurationByIdReq extends Request<{ id: IDuration['id'] }> {}
export interface IPostDurationReq
  extends Request<
    Record<string, never>,
    Record<string, never>,
    {
      user: IUser;
      start_time: IDuration['start_time'];
      end_time?: IDuration['end_time'];
      interrupt_times?: IDuration['interrupt_times'];
      pause_seconds?: IDuration['pause_seconds'];
      type: IDuration['type'];
      description?: IDuration['description'];
    }
  > {}
