import { Request } from 'express';
import { IUser } from './userModel';
import { IDuration } from './durationModel';

export interface IAnalysis {
  label: string;
  amount: number;
  minute: number;
}

export interface IGetAnalysisByParam {
  user_id: IDuration['id'];
  begin_date?: string;
  end_date?: string;
  type?: IDuration['type'];
  description?: IDuration['description'];
}

export interface IGetAnalysisByParamReq
  extends Request<
    Record<string, never>,
    Record<string, never>,
    {
      user: IUser;
    },
    IGetAnalysisByParam
  > {}
