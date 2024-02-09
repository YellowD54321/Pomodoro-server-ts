import { Request } from 'express';
import { IUser } from './userModel';
import { DURATION_TYPE } from '@prisma/client';

export interface IDuration {
  id: string;
  user_id: string;
  start_time: Date;
  end_time: Date | null;
  interrupt_times: number;
  focus_seconds: number;
  pause_seconds: number;
  type: DURATION_TYPE;
  description: string | null;
}

export interface IGetDurationByParams {
  user_id: string;
  begin_date?: string;
  end_date?: string;
  type?: DURATION_TYPE;
  description?: string;
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
      type: DURATION_TYPE;
      description?: string;
    }
  > {}
