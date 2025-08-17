import { Router } from 'express';
import { getInsights } from './insightsController';
import { validateRequest } from '../../common/validation';
import { InsightFiltersSchema } from '@wellio/shared';

const router = Router();

// GET /api/v1/insights
router.get('/', validateRequest(InsightFiltersSchema), getInsights);

// GET /api/v1/insights/clients
router.get('/clients', getInsights);

export { router as insightsRouter };
