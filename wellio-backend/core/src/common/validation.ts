import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { createError } from './errorHandler';

const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.reduce((acc, err) => {
          const field = err.path.join('.');
          acc[field] = err.message;
          return acc;
        }, {} as Record<string, string>);

        next(createError(
          'Validation failed',
          400,
          ErrorCodes.VALIDATION_ERROR,
          details
        ));
      } else {
        next(error);
      }
    }
  };
};
