import { Request, Response } from 'express';
import { HomeSummary } from '@wellio/shared';
import { logger } from '../../common/logger';

export const getHomeSummary = async (req: Request, res: Response) => {
  try {
    logger.info('Getting home summary', { userId: req.user?.id });

    // Mock data - in production this would aggregate from multiple services
    const summary: HomeSummary = {
      total_clients: 24,
      active_sessions: 3,
      unread_messages: 7,
      pending_tasks: 12
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error('Error getting home summary:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get home summary'
      }
    });
  }
};
