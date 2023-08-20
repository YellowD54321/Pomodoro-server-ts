import { testUserId } from "../config";
import { IDuration, IGetDurationByParams } from "../models/durationModel";
import { DurationQueries } from "../queries/durationQueries";
import * as db from "./db";

export const getDurationById = async (
  durationId: IDuration["id"]
): Promise<IDuration> => {
  const [duration] = await db.query<IDuration[]>(
    DurationQueries.GetDurationById,
    [durationId]
  );
  return duration;
};

export const getDurationByParams = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetDurationByParams): Promise<IDuration[]> => {
  const durations = await db.query<IDuration[]>(
    DurationQueries.GetDurationByParams,
    [
      user_id,
      begin_date,
      begin_date,
      end_date,
      end_date,
      type,
      type,
      description,
      description,
    ]
  );
  return durations;
};

export const postDuration = async ({
  user_id,
  start_time,
  end_time,
  interrupt_times,
  focus_seconds,
  pause_seconds,
  type,
  description,
}: Omit<IDuration, "id">) => {
  const { insertId } = await db.query<{ insertId: number }>(
    DurationQueries.PostDuration,
    [
      user_id,
      start_time,
      end_time,
      interrupt_times,
      focus_seconds,
      pause_seconds,
      type,
      description,
    ]
  );
  return insertId;
};

export const deleteDurationInTestAccount = async () => {
  await db.query(DurationQueries.DeleteUserDuration, [testUserId]);
};
