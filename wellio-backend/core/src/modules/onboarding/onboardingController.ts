import { Request, Response } from 'express';
import { logger } from '../../common/logger';

export const sendQuestionnaire = async (req: Request, res: Response) => {
  try {
    logger.info('Sending questionnaire', { userId: req.user?.id, body: req.body });

    res.json({
      success: true,
      message: 'Questionnaire sent successfully'
    });
  } catch (error) {
    logger.error('Error sending questionnaire:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to send questionnaire'
      }
    });
  }
};
