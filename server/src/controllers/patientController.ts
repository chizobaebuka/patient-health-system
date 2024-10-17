import { Request, Response } from 'express';
import Patient, { IPatient } from '../models/Patient';

export const getPatients = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query = { name: { $regex: search, $options: 'i' } };
        }
        const patients: IPatient[] = await Patient.find(query);
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
};

export const getPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const patient: IPatient | null = await Patient.findById(req.params.id);
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
    }
};

export const createPatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const newPatient: IPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({
            status: 'success',
            message: 'Patient created successfully',
            data: newPatient,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error });
    }
};

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedPatient: IPatient | null = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error });
    }
};