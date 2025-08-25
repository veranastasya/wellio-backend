import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../common/logger';
import { getRepo } from '../../data/repo';
import { Session } from '../../data/store';

export const getSessions = async (req: Request, res: Response) => {
  try {
    const filters = req.query as any;
    logger.info('Getting sessions', { userId: req.user?.id, filters });

    const repo = await getRepo();
    const when = filters.when === 'today' ? 'today' : undefined;
    const limit = filters.limit ? Number(filters.limit) : undefined;
    
    const items = await repo.listSessions({ when, limit });

    // Apply additional filters that aren't in the repo yet
    let filteredItems = items;
    if (filters.status) {
      filteredItems = filteredItems.filter(session => session.status === filters.status);
    }

    res.json({
      success: true,
      data: filteredItems
    });
  } catch (error) {
    logger.error('Error getting sessions:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get sessions'
      }
    });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info('Getting session', { userId: req.user?.id, sessionId: id });

    const repo = await getRepo();
    const session = await repo.getSession(id);

    if (!session) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Session not found'
        }
      });
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    logger.error('Error getting session:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get session'
      }
    });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const sessionData = req.body as any;
    logger.info('Creating session', { userId: req.user?.id, sessionData });

    const repo = await getRepo();
    const newSession = await repo.createSession(sessionData as any);

    res.status(201).json({
      success: true,
      data: newSession
    });
  } catch (error) {
    logger.error('Error creating session:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create session'
      }
    });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body as any;
    logger.info('Updating session', { userId: req.user?.id, sessionId: id, updateData });

    const repo = await getRepo();
    const session = await repo.getSession(id);

    if (!session) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Session not found'
        }
      });
    }

    const updatedSession = await repo.updateSession(id, updateData as any);

    res.json({
      success: true,
      data: updatedSession
    });
  } catch (error) {
    logger.error('Error updating session:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update session'
      }
    });
  }
};

export const joinSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info('Joining session', { userId: req.user?.id, sessionId: id });

    const repo = await getRepo();
    const session = await repo.getSession(id);

    if (!session) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Session not found'
        }
      });
    }

    if (session.status !== 'scheduled') {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Session is not available for joining'
        }
      });
    }

    // Generate join URL if not exists
    if (!session.join_url) {
      session.join_url = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;
      await repo.updateSession(id, { join_url: session.join_url });
    }

    res.json({
      success: true,
      data: {
        join_url: session.join_url,
        session_id: session.id
      }
    });
  } catch (error) {
    logger.error('Error joining session:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to join session'
      }
    });
  }
};
