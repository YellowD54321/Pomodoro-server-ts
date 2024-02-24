import { Response } from 'express';
import * as NotificationServices from '../services/notificationServices';
import {
  IGetNotificationsByParamReq,
  IReadNotificationsByParamReq,
} from '../models/notificationModel';

export const getNotifications = async (
  req: IGetNotificationsByParamReq,
  res: Response,
) => {
  const user = req.body.user;
  const isRead = req.query.isRead;

  try {
    const notifications = await NotificationServices.getNotifications({
      user_id: user.id,
      isRead,
    });

    return res.status(200).json({
      notifications,
    });
  } catch (err) {
    console.error('[notification controller][getNotifications][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when get notifications',
    });
  }
};

export const readNotifications = async (
  req: IReadNotificationsByParamReq,
  res: Response,
) => {
  const ids = req.body.ids;

  try {
    await NotificationServices.readNotifications({ ids });
  } catch (err) {
    console.error('[notification controller][readNotification][Error] ', err);

    return res.status(500).json({
      message: 'There was an error when read notifications',
    });
  }
};
