import { Request, Response } from 'express';
import { Insight, InsightFilters } from '@wellio/shared';
import { logger } from '../../common/logger';

// Mock data
const mockInsights: Insight[] = [
  {
    id: '770e8400-e29b-41d4-a716-446655440001',
    type: 'retention_opportunity',
    payload: {
      client_id: '550e8400-e29b-41d4-a716-446655440001',
      risk_score: 0.3,
      reason: 'Missed last session'
    },
    created_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440002',
    type: 'progress_trend',
    payload: {
      client_id: '550e8400-e29b-41d4-a716-446655440002',
      trend: 'improving',
      metric: 'weight_loss',
      change: -2.5
    },
    created_at: '2024-01-24T14:30:00Z'
  }
];

export const getInsights = async (req: Request, res: Response) => {
  try {
    const filters = req.query as unknown as InsightFilters;
    logger.info('Getting insights', { userId: req.user?.id, filters });

    let filteredInsights = [...mockInsights];

    if (filters.type) {
      filteredInsights = filteredInsights.filter(insight =>
        insight.type === filters.type
      );
    }

    const limit = filters.limit || 10;
    const limitedInsights = filteredInsights.slice(0, limit);

    res.json({
      success: true,
      data: limitedInsights
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
