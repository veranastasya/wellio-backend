import { Router } from 'express';
import { 
  getSessions, 
  getSession, 
  createSession, 
  updateSession, 
  joinSession 
} from './sessionsController';
import { validateRequest } from '../../common/validation';
import { 
  SessionFiltersSchema, 
  CreateSessionSchema, 
  UpdateSessionSchema,
  SessionJoinSchema 
} from '@wellio/shared';

const router = Router();

// GET /api/v1/sessions
router.get('/', getSessions);

// GET /api/v1/sessions/:id
router.get('/:id', getSession);

// POST /api/v1/sessions
router.post('/', validateRequest(CreateSessionSchema), createSession);

// PATCH /api/v1/sessions/:id
router.patch('/:id', validateRequest(UpdateSessionSchema), updateSession);

// POST /api/v1/sessions/:id/join
router.post('/:id/join', joinSession);

export { router as sessionsRouter };
