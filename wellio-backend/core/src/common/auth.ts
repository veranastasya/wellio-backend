import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './errorHandler';
import { ErrorCodes } from '@wellio/shared';

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      id?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Authorization header missing or invalid', 401, ErrorCodes.UNAUTHORIZED);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const jwtSecret = process.env.JWT_SECRET || 'dev_secret';

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    
    if (!decoded.id || !decoded.email) {
      throw createError('Invalid token payload', 401, ErrorCodes.UNAUTHORIZED);
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError('Invalid token', 401, ErrorCodes.UNAUTHORIZED));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(createError('Token expired', 401, ErrorCodes.UNAUTHORIZED));
    } else {
      next(error);
    }
  }
};
