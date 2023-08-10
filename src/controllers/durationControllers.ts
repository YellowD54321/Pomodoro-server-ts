import { IGetDurationReq, IPostDurationReq } from "./../models/durationModel";
import { Response } from "express";
import * as DurationServices from "../services/durationServices";
import { isValidDate } from "../utils/check";
import { durationTypes } from "../constants";

export const getDurationById = async (
  req: IGetDurationReq,
  res: Response
): Promise<void> => {
  try {
    const duration = await DurationServices.getDurationById(
      Number(req.params.id)
    );
    res.status(200).json({
      duration,
    });
  } catch (err) {
    console.error(
      "[duration controller][getDurationById][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "There was an error when fetching duration",
    });
  }
};

export const postDuration = async (
  req: IPostDurationReq,
  res: Response
): Promise<void> => {
  const user = req.body.user;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const interrupt_times = req.body.interrupt_times || 0;
  const durationType = req.body.type;
  const description = req.body.description || "";

  if (!start_time || !isValidDate(start_time)) {
    res.status(400).json({
      message: "Invalid start_time. start_time must be Date type",
    });
  }

  if (!durationTypes.includes(durationType)) {
    const types = durationTypes.join(" | ");
    res.status(400).json({
      message: `Invalid type. start_time must be ${types}`,
    });
  }

  const focus_seconds = end_time
    ? Math.floor(
        (new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000
      )
    : 0;

  try {
    let insertid = 0;
    try {
      insertid = await DurationServices.postDuration({
        user_id: user.id,
        start_time,
        end_time,
        focus_seconds,
        interrupt_times,
        type: durationType,
        description,
      });
    } catch (err) {
      console.error(
        "[duration controller][DurationServices.postDuration][Error] ",
        typeof err === "object" ? JSON.stringify(err) : err
      );
      res.status(500).json({
        message: "Post duration failed.",
      });
      return;
    }

    const duration = await DurationServices.getDurationById(insertid);
    res.status(200).json({
      duration,
    });
    return;
  } catch (err) {
    console.error(
      "[duration controller][DurationServices.postDuration][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    res.status(500).json({
      message: "Post duration successful, but unable to get the posted data.",
    });
    return;
  }
};
