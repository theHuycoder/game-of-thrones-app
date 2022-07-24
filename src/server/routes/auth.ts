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

router.get('/verify-token', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.json({
      isValid: false,
    });
  }

  const isValid = await authService.isTokenValid(token as string);

  res.json({
    isValid,
  });
});

router.get('/user-info', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).json(new ServerError('Token invalid', 403));
    return;
  }

  const isValid = await authService.isTokenValid(token as string);

  if (!isValid) {
    res.status(403).json(new ServerError('Token invalid', 403));
    return;
  }

  const matchedUser = await authService.findUserByToken(token);

  res.json({
    user: { email: matchedUser?.email || '', id: matchedUser?.id || '' },
  });
});

export const authRouter = router;
