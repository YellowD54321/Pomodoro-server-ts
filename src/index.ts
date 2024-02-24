import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/userRoutes';
import cors from 'cors';
import authorize, { getUerFromToken } from './middlewares/auth';
import DurationRouter from './routes/durationRoutes';
import AnalysisRouter from './routes/analysisRoutes';
import { PostsRouter, PostRouter } from './routes/postRoutes';
import NotificationRouter from './routes/notificationRoutes';
import { WebSocketServer } from 'ws';
import { NOTIFICATION_UPDATE_SECONDS } from './constants';
import { URL } from 'url';
import * as NotificationServices from './services/notificationServices';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors<Request>());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: '',
  });
});

app.use('/v1/user', UserRouter);
app.use('/v1/posts', PostsRouter);

app.use(authorize);

app.use('/v1/durations', DurationRouter);
app.use('/v1/analysis', AnalysisRouter);
app.use('/v1/post', PostRouter);
app.use('/v1/notification', NotificationRouter);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  if (!req.url) return ws.close();

  const query = new URL(req.url, `http://localhost:${port}`).searchParams;

  const { access_token: accessToken } =
    JSON.parse(query.get('access_token') || '') || {};
  let userId: string;

  try {
    const user = getUerFromToken(accessToken) as { id: string };

    userId = user.id;
  } catch (err) {
    return ws.close();
  }

  console.log('Client connected, user id = ', userId);

  setInterval(async () => {
    const unreadNotifications = await NotificationServices.getNotifications({
      user_id: userId,
      isRead: false,
    });

    const data = {
      notifications: unreadNotifications,
    };

    ws.send(JSON.stringify(data));
  }, NOTIFICATION_UPDATE_SECONDS);

  ws.on('message', (data) => {
    const text = data.toString();
    console.log('#### text', text);
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });
});
