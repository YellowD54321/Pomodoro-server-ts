import { PrismaClient } from '@prisma/client';
import { testUserId } from '../config';
import { IDuration, IGetDurationByParams } from '../models/durationModel';

const prisma = new PrismaClient();

export const getDurationById = async (
  durationId: string,
): Promise<IDuration | null> => {
  const duration = await prisma.duration.findUnique({
    where: {
      id: durationId,
    },
  });

  return duration;
};

export const getDurationByParams = async ({
  user_id,
  begin_date,
  end_date,
  type,
  description,
}: IGetDurationByParams): Promise<IDuration[]> => {
  const durations = await prisma.duration.findMany({
    where: {
      user_id,
      ...(begin_date && { start_time: begin_date }),
      ...(end_date && { end_time: end_date }),
      ...(type && { type }),
      ...(typeof description === 'string' && { description }),
    },
  });

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
}: Omit<IDuration, 'id'>) => {
  const newDuration = await prisma.duration.create({
    data: {
      user: {
        connect: {
          id: user_id,
        },
      },
      start_time,
      end_time,
      interrupt_times,
      focus_seconds,
      pause_seconds,
      type,
      description,
    },
  });

  return newDuration.id;
};

export const deleteDurationInTestAccount = async () => {
  await prisma.duration.deleteMany({
    where: {
      user_id: testUserId,
    },
  });
};
