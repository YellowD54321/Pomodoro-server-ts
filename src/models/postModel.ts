import { DURATION_TYPE, INTERACTION_EMOJI } from '@prisma/client';
import { Request } from 'express';
import { IUser } from './userModel';

export interface IPostInteraction {
  user_id: string;
  post_id: string;
  emoji: INTERACTION_EMOJI | null;
}

export interface IPost {
  durationId: string;
  user_id: string;
  start_time: Date;
  end_time: Date;
  interrupt_times: number;
  focus_seconds: number;
  pause_seconds: number;
  type: DURATION_TYPE;
  description: string | null;
  interactions: IPostInteraction[];
}

export interface IGetPostsByParam {
  user_id: string | null;
  page: number;
}

export interface IGetPostsByParamReq
  extends Request<
    Record<string, never>,
    Record<string, never>,
    {
      user: IUser;
    },
    IGetPostsByParam
  > {}
