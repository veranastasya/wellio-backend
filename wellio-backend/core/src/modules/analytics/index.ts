import { Router } from 'express';
import { 
  getAnalyticsSummary, 
  getChurnPredictions, 
  getOptimalScheduling,
  getRevenueForecast,
  exportAnalytics 
} from './analyticsController';
import { validateRequest } from '../../common/validation';
import { 
  AnalyticsSummarySchema, 
  ChurnPredictionSchema,
  RevenueForecastSchema,
  AnalyticsExportSchema 
} from '@wellio/shared';

const router = Router();

// GET /api/v1/analytics/summary
router.get('/summary', validateRequest(AnalyticsSummarySchema), getAnalyticsSummary);

// GET /api/v1/predictions/churn
router.get('/predictions/churn', validateRequest(ChurnPredictionSchema), getChurnPredictions);

// GET /api/v1/analytics/optimal-scheduling
router.get('/optimal-scheduling', getOptimalScheduling);

// GET /api/v1/analytics/revenue-forecast
router.get('/revenue-forecast', validateRequest(RevenueForecastSchema), getRevenueForecast);

// GET /api/v1/analytics/export
router.get('/export', validateRequest(AnalyticsExportSchema), exportAnalytics);

export { router as analyticsRouter };
