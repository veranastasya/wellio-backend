import { Request, Response } from 'express';
import { Search } from '@wellio/shared';
import { logger } from '../../common/logger';

export const search = async (req: Request, res: Response) => {
  try {
    const searchParams = req.query as unknown as Search;
    logger.info('Searching', { userId: req.user?.id, searchParams });

    // Mock search results
    const results = {
      clients: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          full_name: 'Emma Johnson',
          email: 'emma.johnson@email.com'
        }
      ],
      conversations: [
        {
          id: 'conv-123',
          client_name: 'Emma Johnson',
          last_message: 'How is the new diet plan working?'
        }
      ],
      sessions: [
        {
          id: '660e8400-e29b-41d4-a716-446655440001',
          client_name: 'Emma Johnson',
          service: 'nutrition',
          start_at: '2024-02-01T14:00:00Z'
        }
      ]
    };

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    logger.error('Error searching:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to search'
      }
    });
  }
};
