import express, { Request, Response, NextFunction } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from '../controllers/tasks';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Wrapper for async route handlers to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', authenticate, asyncHandler(getTasks));
router.post('/', authenticate, asyncHandler(createTask));
router.get('/:id', authenticate, asyncHandler(getTaskById));
router.patch('/:id', authenticate, asyncHandler(updateTask));
router.delete('/:id', authenticate, asyncHandler(deleteTask));
router.post('/:id/toggle', authenticate, asyncHandler(toggleTask));

export default router;
