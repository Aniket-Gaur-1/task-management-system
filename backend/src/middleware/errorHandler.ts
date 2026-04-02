import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Log error details (even in production for debugging)
  console.error('❌ Error:', {
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    error: err instanceof AppError ? err.message : err.message,
    stack: isProduction ? undefined : err.stack,
  });
  
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    // Don't expose internal errors to client in production
    const clientMessage = isProduction 
      ? 'Internal server error' 
      : err.message;
    
    res.status(500).json({ 
      error: clientMessage,
      ...(process.env.NODE_ENV !== 'production' && { details: err.message })
    });
  }
};
