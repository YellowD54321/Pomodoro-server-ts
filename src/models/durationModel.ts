import { Request } from "express";
import { IUser } from "./userModel";

export type IDurationType = "work" | "rest" | "pause";

export interface IDuration {
  id: number;
  user_id: number;
  start_time: Date;
  end_time?: Date;
  interrupt_times: number;
  focus_seconds: number;
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
      type: IDuration["type"];
      description?: IDuration["description"];
    }
  > {}
