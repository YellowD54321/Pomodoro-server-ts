import { PrismaClient } from '@prisma/client';
import { IGetPostsByParam, IPost } from '../models/postModel';
import { POSTS_ONE_PAGE_COUNT } from '../constants';

const prisma = new PrismaClient();

export const getPosts = async ({
  user_id,
  page = 1,
}: IGetPostsByParam): Promise<IPost[] | null> => {
  const durations = await prisma.duration.findMany({
    where: {
      end_time: {
        not: null,
      },
      ...(user_id && {
        user_id: {
          not: user_id,
        },
      }),
    },
    orderBy: {
      end_time: 'desc',
    },
    take: POSTS_ONE_PAGE_COUNT,
    skip: (page - 1) * POSTS_ONE_PAGE_COUNT,
  });

  const posts = durations.map((duration) => ({
    durationId: duration.id,
    user_id: duration.user_id,
    start_time: duration.start_time,
    end_time: duration.end_time,
    interrupt_times: duration.interrupt_times,
    focus_seconds: duration.focus_seconds,
    pause_seconds: duration.pause_seconds,
    type: duration.type,
    description: duration.description,
  })) as IPost[];

  return posts;
};
