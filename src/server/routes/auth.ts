import { Router } from 'express';
import { ServerError } from '@/modals/error.modals';
import db from '../db/lowdb';
import { AuthService } from '../services/auth.services';

const router = Router();
const authService = new AuthService(db);

router.post('/login', async (req, res) => {
  const { body } = req;
  const authInfo = await authService.handleLogin(body);
  if (!authInfo) {
    res.status(401).json(new ServerError('Wrong username or password', 401));
    return;
  }

  res.json(authInfo);
});

export const authRouter = router;
