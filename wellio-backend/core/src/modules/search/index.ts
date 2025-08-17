import { Router } from 'express';
import { search } from './searchController';
import { validateRequest } from '../../common/validation';
import { SearchSchema } from '@wellio/shared';

const router = Router();

// GET /api/v1/search
router.get('/', validateRequest(SearchSchema), search);

export { router as searchRouter };
