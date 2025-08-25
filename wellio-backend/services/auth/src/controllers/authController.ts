import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { getCache } from '../lib/cache';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_in_production';
const JWT_EXPIRES_IN = '24h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Helper function to sign access tokens
const signAccessToken = (payload: { id: string; email: string; role: string }) => {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    issuer: process.env.AUTH_ISSUER || 'wellio-auth',
    audience: process.env.AUTH_AUDIENCE || 'wellio-api',
    expiresIn: JWT_EXPIRES_IN
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Dev mode: return fake token without database
    if (process.env.AUTH_DEV_MODE === 'true') {
      console.log(`[auth] DEV MODE: Login attempt for ${email}`);
      
      const fakeUser = {
        id: 'dev-user-id',
        email: email,
        name: 'Dev User',
        role: 'user',
        created_at: new Date().toISOString()
      };

      const issuer = process.env.AUTH_ISSUER || 'wellio-auth';
      const audience = process.env.AUTH_AUDIENCE || 'wellio-api';

      const accessToken = signAccessToken({
        id: fakeUser.id,
        email: fakeUser.email,
        role: fakeUser.role
      });

      const refreshToken = jwt.sign(
        { id: fakeUser.id },
        JWT_SECRET,
        { 
          expiresIn: REFRESH_TOKEN_EXPIRES_IN,
          issuer: issuer,
          algorithm: 'HS256'
        }
      );

      // Store refresh token in cache
      const cache = await getCache();
      await cache.set(`refresh_token:${fakeUser.id}`, refreshToken, { ttlSec: 7 * 24 * 60 * 60 });

      return res.json({
        success: true,
        data: {
          user: fakeUser,
          access_token: accessToken,
          refreshToken
        }
      });
    }

    // Production mode: use database
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate tokens
    const issuer = process.env.AUTH_ISSUER || 'wellio-auth';
    const audience = process.env.AUTH_AUDIENCE || 'wellio-api';

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { 
        expiresIn: JWT_EXPIRES_IN,
        issuer: issuer,
        audience: audience,
        algorithm: 'HS256'
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { 
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        issuer: issuer,
        algorithm: 'HS256'
      }
    );

    // Store refresh token in cache
    const cache = await getCache();
    await cache.set(`refresh_token:${user.id}`, refreshToken, { ttlSec: 7 * 24 * 60 * 60 });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        access_token: accessToken,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      [email, hashedPassword, name, role]
    );

    const user = result.rows[0];

    // Generate tokens
    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    const issuer = process.env.AUTH_ISSUER || 'wellio-auth';
    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { 
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        issuer: issuer,
        algorithm: 'HS256'
      }
    );

    // Store refresh token in cache
    const cache = await getCache();
    await cache.set(`refresh_token:${user.id}`, refreshToken, { ttlSec: 7 * 24 * 60 * 60 });

    res.status(201).json({
      success: true,
      data: {
        user,
        access_token: accessToken,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const cache = await getCache();
      await cache.del(`refresh_token:${decoded.id}`);
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
    const cache = await getCache();
    const storedToken = await cache.get(`refresh_token:${decoded.id}`);

    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }

    // Get user data
    const result = await pool.query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [decoded.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    // Generate new tokens
    const issuer = process.env.AUTH_ISSUER || 'wellio-auth';
    const audience = process.env.AUTH_AUDIENCE || 'wellio-api';

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { 
        expiresIn: JWT_EXPIRES_IN,
        issuer: issuer,
        audience: audience,
        algorithm: 'HS256'
      }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { 
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        issuer: issuer,
        algorithm: 'HS256'
      }
    );

    // Update refresh token in cache
    await cache.set(`refresh_token:${user.id}`, newRefreshToken, { ttlSec: 7 * 24 * 60 * 60 });

    res.json({
      success: true,
      data: {
        token: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await pool.query(
      'SELECT id, email, name FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store reset token in cache
    const cache = await getCache();
    await cache.set(`reset_token:${user.id}`, resetToken, { ttlSec: 3600 });

    // TODO: Send email with reset link
    // For now, just return the token
    res.json({
      success: true,
      message: 'Password reset email sent',
      data: { resetToken } // Remove this in production
    });
  } catch (error) {
    logger.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const cache = await getCache();
    const storedToken = await cache.get(`reset_token:${decoded.id}`);

    if (!storedToken || storedToken !== token) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, decoded.id]
    );

    // Remove reset token
    await cache.del(`reset_token:${decoded.id}`);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}; 