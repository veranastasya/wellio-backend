import { Request, Response } from 'express';
import { HomeSummary } from '@wellio/shared';
import { logger } from '../../common/logger';
import { getRepo } from '../../data/repo';

export const getHomeSummary = async (req: Request, res: Response) => {
  try {
    logger.info('Getting home summary', { userId: req.user?.id });

    const repo = await getRepo();
    const summary = await repo.homeSummary();

    const response: HomeSummary = {
      total_clients: summary.clients_total,
      active_sessions: summary.sessions_today,
      unread_messages: summary.unread_messages,
      pending_tasks: 12 // TODO: implement pending tasks in repo
    };

    res.json({
      success: true,
      data: response
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
