import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

const ErrorCodes = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN'
} as const;

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: Record<string, any>;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    requestId: req.id,
    url: req.originalUrl,
    method: req.method
  });

  const statusCode = err.statusCode || 500;
  const errorResponse: ErrorResponse = {
    error: {
      code: err.code || ErrorCodes.INTERNAL_ERROR,
      message: err.message || 'Internal server error',
      details: err.details
    }
  };

  res.status(statusCode).json(errorResponse);
};

export const createError = (message: string, statusCode: number = 500, code?: string, details?: Record<string, any>): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
};
