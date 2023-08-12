import { Request } from "express";
import { IUser } from "./userModel";

export type IDurationType = "work" | "rest";

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

export interface IGetDurationReq extends Request<{ id: IDuration["id"] }> {}
export interface IPostDurationReq
  extends Request<
    {},
    {},
    {
      user: IUser;
      start_time: IDuration["start_time"];
      end_time?: IDuration["end_time"];
      interrupt_times?: IDuration["interrupt_times"];
      pause_seconds?: IDuration["pause_seconds"];
      type: IDuration["type"];
      description?: IDuration["description"];
    }
  > {}
