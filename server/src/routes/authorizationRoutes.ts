import express from 'express';
import { createAuthorizationRequest, getAuthorizationRequestById, getAuthorizationRequests, updateAuthorizationRequest } from '../controllers/authorizationController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createAuthorizationRequest);
router.get('/', getAuthorizationRequests);
router.get('/:id', getAuthorizationRequestById);
router.put('/:id', updateAuthorizationRequest);

export default router;