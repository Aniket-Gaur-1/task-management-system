import { Response } from 'express';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import prisma from '../models/prisma';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const userId = req.userId!;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 10));
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = { userId };

    if (status) {
      whereClause.status = status;
    }

    // Improved search that works with both SQLite and PostgreSQL
    if (search && typeof search === 'string') {
      whereClause.OR = [
        { title: { contains: search } },
  { description: { contains: search } }
      ];
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.task.count({ where: whereClause });

    res.json({
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id: String(id), userId },
    });

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    res.json(task);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId!;

    if (!title) {
      throw new AppError(400, 'Title is required');
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id: String(id), userId },
    });

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    const updatedTask = await prisma.task.update({
      where: { id: String(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
    });

    res.json(updatedTask);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id: String(id), userId },
    });

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    await prisma.task.delete({
      where: { id: String(id) },
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const task = await prisma.task.findFirst({
      where: { id: String(id), userId },
    });

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    const updatedTask = await prisma.task.update({
      where: { id: String(id) },
      data: { status: newStatus },
    });

    res.json(updatedTask);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to toggle task' });
    }
  }
};
