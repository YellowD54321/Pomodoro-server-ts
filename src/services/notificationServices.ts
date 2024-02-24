import { PrismaClient } from '@prisma/client';
import {
  ICreateNotificationByParam,
  IGetNotificationByParam,
  INotification,
  IReadNotificationsByParam,
} from '../models/notificationModel';

const prisma = new PrismaClient();

export const getNotifications = async ({
  user_id,
  isRead,
}: IGetNotificationByParam): Promise<INotification[]> => {
  const notifications = await prisma.notification.findMany({
    where: {
      receiver: {
        id: user_id,
      },
      ...(isRead !== undefined && {
        isRead,
      }),
    },
    select: {
      id: true,
      receiver: true,
      receiver_id: true,
      sender: true,
      sender_id: true,
      post: true,
      post_id: true,
      content: true,
      isRead: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return notifications;
};

export const createNotification = async ({
  receiver_id,
  sender_id,
  post_id,
  content,
}: ICreateNotificationByParam) => {
  await prisma.notification.create({
    data: {
      receiver: {
        connect: {
          id: receiver_id,
        },
      },
      sender: {
        connect: {
          id: sender_id,
        },
      },
      ...(post_id && {
        post: {
          connect: {
            id: post_id,
          },
        },
      }),
      content,
      isRead: false,
    },
  });
};

export const readNotifications = async ({ ids }: IReadNotificationsByParam) => {
  await prisma.notification.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      isRead: true,
    },
  });
};
