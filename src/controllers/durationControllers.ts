import {
  IGetDurationByIdReq,
  IGetDurationByParamsReq,
  IPostDurationReq,
} from './../models/durationModel';
import { Response } from 'express';
import * as DurationServices from '../services/durationServices';
import { isValidDate } from '../utils/date/check';
import dayjs from 'dayjs';
import { addDay, addMinite, subtractDay } from '../utils/date/calculate';
import { getBeginDate } from '../utils/date/set';
import { testUserId } from '../config';
import { DURATION_TYPE } from '@prisma/client';

export const getDurationByParams = async (
  req: IGetDurationByParamsReq,
  res: Response,
) => {
  const user = req.body.user;
  const begin_date = req.query.begin_date;
  const end_date = req.query.end_date;
  const durationType = req.query.type;
  const description = req.query.description;

  try {
    const durations = await DurationServices.getDurationByParams({
      user_id: user.id,
      begin_date,
      end_date,
      type: durationType,
      description,
    });

    return res.status(200).json({
      durations,
    });
  } catch (err) {
    console.error('[duration controller][getDurationByParams][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when fetching duration',
    });
  }
};

export const getDurationById = async (
  req: IGetDurationByIdReq,
  res: Response,
) => {
  try {
    const duration = await DurationServices.getDurationById(req.params.id);

    return res.status(200).json({
      duration,
    });
  } catch (err) {
    console.error('[duration controller][getDurationById][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when fetching duration',
    });
  }
};

export const postDuration = async (req: IPostDurationReq, res: Response) => {
  const user = req.body.user;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const interrupt_times = req.body.interrupt_times || 0;
  const pause_seconds = req.body.pause_seconds || 0;
  const durationType = req.body.type;
  const description = req.body.description || '';

  if (!start_time || !isValidDate(start_time)) {
    return res.status(400).json({
      message: 'Invalid start_time. start_time must be Date type',
    });
  }

  if (!Object.keys(DURATION_TYPE).includes(durationType)) {
    const types = Object.keys(DURATION_TYPE).join(' | ');

    return res.status(400).json({
      message: `Invalid type. type must be ${types}`,
    });
  }

  const focus_seconds = end_time
    ? Math.floor(
        (new Date(end_time).getTime() - new Date(start_time).getTime()) / 1000,
      ) - pause_seconds
    : 0;

  try {
    let insertId;

    try {
      insertId = await DurationServices.postDuration({
        user_id: user.id,
        start_time: dayjs(start_time).toDate(),
        end_time: dayjs(end_time).toDate(),
        interrupt_times,
        focus_seconds,
        pause_seconds,
        type: durationType,
        description,
      });
    } catch (err) {
      console.error(
        '[duration controller][DurationServices.postDuration][Error] ',
        err,
      );

      return res.status(500).json({
        message: 'Post duration failed.',
      });
    }
    const duration = await DurationServices.getDurationById(insertId);

    return res.status(200).json({
      duration,
    });
  } catch (err) {
    console.error(
      '[duration controller][DurationServices.getDurationById][Error] ',
      err,
    );

    return res.status(500).json({
      message: 'Post duration successful, but unable to get the posted data.',
    });
  }
};

export const CreateTestData = async (req: IPostDurationReq, res: Response) => {
  const user = req.body.user;
  if (user.id !== testUserId) {
    return res.status(401).json({
      message: 'Invalid user.',
    });
  }

  // Delete old test data first.
  try {
    await DurationServices.deleteDurationInTestAccount();
  } catch (err) {
    console.error(
      '[duration controller][DurationServices.deleteDurationInTestAccount][Error] ',
      err,
    );

    return res.status(500).json({
      message: 'Delete duration failed.',
    });
  }

  const DAYS = 100;
  const MIN_NUMBER_IN_ONE_DAY = 4;
  const MAX_NUMBER_IN_ONE_DAY = 8;
  const WORK_MINUTES = 50;
  const REST_MINUTES = 10;
  const ONE_DURATION = WORK_MINUTES + REST_MINUTES;
  const DESCRIPTIONS = ['work', 'study', 'side project', 'game'];
  const FIRST_DAY = subtractDay(new Date(), DAYS);

  for (let i = 0; i < DAYS; i++) {
    const TODAY_NUMBER = Math.floor(
      Math.random() * (MAX_NUMBER_IN_ONE_DAY - MIN_NUMBER_IN_ONE_DAY) +
        MIN_NUMBER_IN_ONE_DAY,
    );
    const currentDay = addDay(FIRST_DAY, i);
    const FIRST_START_TIME = getBeginDate(currentDay);

    for (let j = 0; j < TODAY_NUMBER; j++) {
      const workStartTime = addMinite(FIRST_START_TIME, ONE_DURATION * j);
      const workEndTime = addMinite(workStartTime, WORK_MINUTES);
      const restStartTime = workEndTime;
      const restEndTime = addMinite(restStartTime, REST_MINUTES);
      const interrupt_times = 0;
      const focus_seconds = WORK_MINUTES * 60;
      const pause_seconds = 0;
      const description =
        DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

      try {
        await DurationServices.postDuration({
          user_id: user.id,
          start_time: dayjs(workStartTime).toDate(),
          end_time: dayjs(workEndTime).toDate(),
          interrupt_times,
          focus_seconds,
          pause_seconds,
          type: 'WORK',
          description,
        });

        await DurationServices.postDuration({
          user_id: user.id,
          start_time: dayjs(restStartTime).toDate(),
          end_time: dayjs(restEndTime).toDate(),
          interrupt_times,
          focus_seconds: 0,
          pause_seconds,
          type: 'REST',
          description,
        });
      } catch (err) {
        console.error(
          '[duration controller][CreateTestData DurationServices.postDuration][Error] ',
          err,
        );

        return res.status(500).json({
          message: 'Post duration failed.',
        });
      }
    }
  }

  return res.status(200).json({
    isSuccess: true,
  });
};
