import { Router } from 'express';
import { sendQuestionnaire } from './onboardingController';
import { validateRequest } from '../../common/validation';
import { QuestionnaireSendSchema } from '@wellio/shared';

const router = Router();

// POST /api/v1/onboarding/questionnaires/send
router.post('/questionnaires/send', validateRequest(QuestionnaireSendSchema), sendQuestionnaire);

export { router as onboardingRouter };
