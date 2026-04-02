import express, { Request, Response, NextFunction } from 'express';
import { register, login, refresh, logout } from '../controllers/auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Wrapper for async route handlers to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', authenticate, asyncHandler(logout));

export default router;
