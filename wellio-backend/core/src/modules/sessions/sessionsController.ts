import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { 
  Session, 
  CreateSession, 
  UpdateSession, 
  SessionFilters,
  PaginatedResponse 
} from '@wellio/shared';
import { logger } from '../../common/logger';

// Mock data - in production this would come from database
const mockSessions: Session[] = [
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    client_id: '550e8400-e29b-41d4-a716-446655440001',
    service: 'nutrition',
    start_at: '2024-02-01T14:00:00Z',
    duration_min: 60,
    status: 'scheduled',
    join_url: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    client_id: '550e8400-e29b-41d4-a716-446655440002',
    service: 'fitness',
    start_at: '2024-01-30T10:00:00Z',
    duration_min: 45,
    status: 'completed',
    join_url: null
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440003',
    client_id: '550e8400-e29b-41d4-a716-446655440003',
    service: 'wellness',
    start_at: '2024-01-30T16:00:00Z',
    duration_min: 30,
    status: 'scheduled',
    join_url: 'https://meet.google.com/xyz-uvw-rst'
  }
];

export const getSessions = async (req: Request, res: Response) => {
  try {
    const filters = req.query as unknown as SessionFilters;
    logger.info('Getting sessions', { userId: req.user?.id, filters });

    let filteredSessions = [...mockSessions];

    // Apply filters
    if (filters.when) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      switch (filters.when) {
        case 'today':
          filteredSessions = filteredSessions.filter(session => {
            const sessionDate = new Date(session.start_at);
            return sessionDate >= today && sessionDate < tomorrow;
          });
          break;
        case 'tomorrow':
          const dayAfterTomorrow = new Date(tomorrow);
          dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
          filteredSessions = filteredSessions.filter(session => {
            const sessionDate = new Date(session.start_at);
            return sessionDate >= tomorrow && sessionDate < dayAfterTomorrow;
          });
          break;
        case 'this_week':
          const weekStart = new Date(today);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);
          filteredSessions = filteredSessions.filter(session => {
            const sessionDate = new Date(session.start_at);
            return sessionDate >= weekStart && sessionDate < weekEnd;
          });
          break;
        case 'next_week':
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(nextWeekStart.getDate() + 7 - nextWeekStart.getDay());
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);
          filteredSessions = filteredSessions.filter(session => {
            const sessionDate = new Date(session.start_at);
            return sessionDate >= nextWeekStart && sessionDate < nextWeekEnd;
          });
          break;
      }
    }

    if (filters.status) {
      filteredSessions = filteredSessions.filter(session =>
        session.status === filters.status
      );
    }

    if (filters.client_id) {
      filteredSessions = filteredSessions.filter(session =>
        session.client_id === filters.client_id
      );
    }

    // Apply limit
    const limit = filters.limit || 20;
    const limitedSessions = filteredSessions.slice(0, limit);

    res.json({
      success: true,
      data: limitedSessions
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

    const session = mockSessions.find(s => s.id === id);

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
    const sessionData = req.body as CreateSession;
    logger.info('Creating session', { userId: req.user?.id, sessionData });

    const newSession: Session = {
      id: uuidv4(),
      ...sessionData,
      join_url: null
    };

    mockSessions.push(newSession);

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
    const updateData = req.body as UpdateSession;
    logger.info('Updating session', { userId: req.user?.id, sessionId: id, updateData });

    const sessionIndex = mockSessions.findIndex(s => s.id === id);

    if (sessionIndex === -1) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Session not found'
        }
      });
    }

    mockSessions[sessionIndex] = {
      ...mockSessions[sessionIndex],
      ...updateData
    };

    res.json({
      success: true,
      data: mockSessions[sessionIndex]
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

    const session = mockSessions.find(s => s.id === id);

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
