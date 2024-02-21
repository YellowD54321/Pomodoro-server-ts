import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/userRoutes';
import cors from 'cors';
import authorize from './middlewares/auth';
import DurationRouter from './routes/durationRoutes';
import AnalysisRouter from './routes/analysisRoutes';
import { PostsRouter, PostRouter } from './routes/postRoutes';

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.send('123');

//   ws.on('message', (data) => {
//     const text = data.toString();
//     console.log('#### text', text);
//   });

//   ws.on('close', () => {
//     console.log('Connection closed');
//   });
// });
