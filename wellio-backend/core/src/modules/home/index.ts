import { Router } from 'express';
import { getHomeSummary } from './homeController';
import { validateRequest } from '../../common/validation';
import { HomeSummarySchema } from '@wellio/shared';

const router = Router();

// GET /api/v1/home/summary
router.get('/summary', getHomeSummary);

export { router as homeRouter };
