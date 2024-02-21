import { PrismaClient } from '@prisma/client';
import {
  IGetPostById,
  IGetPostsByParam,
  ILikePostByParam,
  IPost,
} from '../models/postModel';
import { POSTS_ONE_PAGE_COUNT, VALID_POST_WORK_SECONDS } from '../constants';

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
      focus_seconds: {
        gte: VALID_POST_WORK_SECONDS,
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
    select: {
      id: true,
      user_id: true,
      start_time: true,
      end_time: true,
      interrupt_times: true,
      focus_seconds: true,
      pause_seconds: true,
      type: true,
      description: true,
      PostInteraction: {
        where: {
          emoji: {
            not: null,
          },
        },
      },
    },
    take: POSTS_ONE_PAGE_COUNT,
    skip: (page - 1) * POSTS_ONE_PAGE_COUNT,
  });

  const posts = durations.map((duration) => ({
    id: duration.id,
    durationId: duration.id,
    user_id: duration.user_id,
    start_time: duration.start_time,
    end_time: duration.end_time,
    interrupt_times: duration.interrupt_times,
    focus_seconds: duration.focus_seconds,
    pause_seconds: duration.pause_seconds,
    type: duration.type,
    description: duration.description,
    interactions: duration.PostInteraction.map((interaction) => ({
      user_id: interaction.user_id,
      post_id: interaction.post_id,
      emoji: interaction.emoji,
    })),
  })) as IPost[];

  return posts;
};

export const getPostById = async ({
  post_id,
}: IGetPostById): Promise<IPost | null> => {
  const duration = await prisma.duration.findUnique({
    where: {
      id: post_id,
      end_time: {
        not: null,
      },
    },
    select: {
      id: true,
      user: true,
      user_id: true,
      start_time: true,
      end_time: true,
      interrupt_times: true,
      focus_seconds: true,
      pause_seconds: true,
      type: true,
      description: true,
      PostInteraction: true,
      Notification: true,
    },
  });

  if (!duration) return null;

  const post = {
    ...duration,
    durationId: duration.id,
    interactions: duration.PostInteraction,
  } as IPost;

  return post;
};

export const likePost = async ({
  post_id,
  user_id,
  emoji,
}: ILikePostByParam) => {
  await prisma.postInteraction.upsert({
    where: {
      post_id_user_id: {
        user_id,
        post_id,
      },
    },
    create: {
      user: {
        connect: {
          id: user_id,
        },
      },
      post: {
        connect: {
          id: post_id,
        },
      },
      emoji,
    },
    update: {
      emoji,
    },
  });
};
