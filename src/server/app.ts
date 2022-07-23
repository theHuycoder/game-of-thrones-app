import express from 'express';
import { authRouter } from './routes/auth';

const app = express();

app.use(
  express.json({
    limit: '100mb',
  }),
);

app.use('/api/auth', authRouter);

export const handler = app;
