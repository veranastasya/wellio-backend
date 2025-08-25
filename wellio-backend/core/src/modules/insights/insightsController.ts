import { Request, Response } from 'express';
import { logger } from '../../common/logger';
import { getRepo } from '../../data/repo';

export const getInsights = async (req: Request, res: Response) => {
  try {
    const filters = req.query as any;
    logger.info('Getting insights', { userId: req.user?.id, filters });

    const repo = await getRepo();
    const scope = filters.scope || 'home';
    const limit = filters.limit ? Number(filters.limit) : 10;
    
    const items = await repo.listInsights(scope, limit);

    // Apply additional filters that aren't in the repo yet
    let filteredItems = items;
    if (filters.type) {
      filteredItems = filteredItems.filter(insight => insight.type === filters.type);
    }

    res.json({
      success: true,
      data: filteredItems
    });
  } catch (error) {
    logger.error('Error getting insights:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get insights'
      }
    });
  }
};
