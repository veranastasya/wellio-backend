import { Router } from 'express';
import { 
  getClients, 
  getClient, 
  createClient, 
  updateClient, 
  getClientFacets 
} from './clientsController';
import { validateRequest } from '../../common/validation';
import { 
  ClientFiltersSchema, 
  CreateClientSchema, 
  UpdateClientSchema 
} from '@wellio/shared';

const router = Router();

// GET /api/v1/clients
router.get('/', validateRequest(ClientFiltersSchema), getClients);

// GET /api/v1/clients/facets
router.get('/facets', getClientFacets);

// GET /api/v1/clients/:id
router.get('/:id', getClient);

// POST /api/v1/clients
router.post('/', validateRequest(CreateClientSchema), createClient);

// PATCH /api/v1/clients/:id
router.patch('/:id', validateRequest(UpdateClientSchema), updateClient);

export { router as clientsRouter };
