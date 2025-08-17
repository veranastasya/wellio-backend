import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UploadResponse } from '@wellio/shared';
import { logger } from '../../common/logger';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    logger.info('Uploading file', { userId: req.user?.id });

    // Mock file upload response
    const uploadResponse: UploadResponse = {
      file_id: uuidv4(),
      filename: 'sample-file.pdf',
      size: 1024,
      url: 'https://storage.example.com/files/sample-file.pdf'
    };

    res.json({
      success: true,
      data: uploadResponse
    });
  } catch (error) {
    logger.error('Error uploading file:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to upload file'
      }
    });
  }
};
