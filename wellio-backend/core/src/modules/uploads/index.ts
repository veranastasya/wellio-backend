import { Router } from 'express';
import { uploadFile } from './uploadsController';

const router = Router();

// POST /api/v1/uploads
router.post('/', uploadFile);

export { router as uploadsRouter };
