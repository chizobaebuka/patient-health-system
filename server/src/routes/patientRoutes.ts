import express from 'express';
import { getPatients, getPatientById, createPatient, updatePatient } from '../controllers/patientController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);

export default router;