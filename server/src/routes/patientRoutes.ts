import express from 'express';
import { getPatients, getPatientById, createPatient, updatePatient } from '../controllers/patientController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);

export default router;