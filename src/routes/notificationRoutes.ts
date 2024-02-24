import express from 'express';
import * as NotificationControllers from '../controllers/notificationControllers';

const NotificationRouter = express.Router();

NotificationRouter.route('').get(NotificationControllers.getNotifications);
NotificationRouter.route('readNotifications').post(
  NotificationControllers.readNotifications,
);

export default NotificationRouter;
