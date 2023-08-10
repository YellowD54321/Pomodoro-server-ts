import { IDuration } from "../models/durationModel";
import { DurationQueries } from "../queries/durationQueries";
import * as db from "./db";

export const getDurationById = async (durationId: IDuration["id"]) => {
  return await db.query<IDuration>(DurationQueries.GetDurationById, [
    durationId,
  ]);
};

export const postDuration = async ({
  start_time,
  end_time,
  interrupt_times,
  focus_seconds,
  type,
  description,
}: Omit<IDuration, "id">) => {
  const { insertid } = await db.query<{ insertid: number }>(
    DurationQueries.PostDuration,
    [start_time, end_time, interrupt_times, focus_seconds, type, description]
  );
  return insertid;
};
