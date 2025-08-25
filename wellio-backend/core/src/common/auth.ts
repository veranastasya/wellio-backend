import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './errorHandler';

const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED'
} as const;

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

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: {
          code: 'NO_TOKEN',
          message: 'Authorization header missing or invalid'
        }
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const jwtSecret = process.env.JWT_SECRET || 'dev_secret';
    const issuer = process.env.AUTH_ISSUER || 'wellio-auth';
    const audience = process.env.AUTH_AUDIENCE || 'wellio-api';

    try {
      const decoded = jwt.verify(token, jwtSecret, {
        algorithms: ['HS256'],
        issuer: issuer,
        audience: audience
      }) as JwtPayload;
      
      if (!decoded.id || !decoded.email) {
        return res.status(401).json({
          error: {
            code: 'INVALID_TOKEN',
            reason: 'Invalid token payload'
          }
        });
      }

      req.user = decoded;
      next();
    } catch (jwtError) {
      console.warn('[core] JWT verify failed:', jwtError.name, jwtError.message);
      return res.status(401).json({
        error: {
          code: 'INVALID_TOKEN',
          reason: jwtError.name
        }
      });
    }
  } catch (error) {
    console.warn('[core] Auth middleware error:', error);
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        reason: 'Unknown error'
      }
    });
  }
};
