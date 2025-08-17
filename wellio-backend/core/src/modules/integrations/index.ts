import { Router } from 'express';
import { 
  connectMfp, 
  connectFatsecret, 
  handleMfpWebhook, 
  handleFatsecretWebhook,
  createDataImport,
  getImportStatus 
} from './integrationsController';
import { validateRequest } from '../../common/validation';
import { 
  IntegrationConnectSchema, 
  DataImportSchema 
} from '@wellio/shared';

const router = Router();

// POST /api/v1/integrations/mfp/connect
router.post('/mfp/connect', validateRequest(IntegrationConnectSchema), connectMfp);

// POST /api/v1/integrations/fatsecret/connect
router.post('/fatsecret/connect', validateRequest(IntegrationConnectSchema), connectFatsecret);

// POST /api/v1/integrations/mfp/webhook
router.post('/mfp/webhook', handleMfpWebhook);

// POST /api/v1/integrations/fatsecret/webhook
router.post('/fatsecret/webhook', handleFatsecretWebhook);

// POST /api/v1/data-imports/manual
router.post('/data-imports/manual', validateRequest(DataImportSchema), createDataImport);

// GET /api/v1/data-imports/status
router.get('/data-imports/status', getImportStatus);

export { router as integrationsRouter };
