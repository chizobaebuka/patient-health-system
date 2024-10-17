import api from './api';
import { Patient } from '../types';

export const getPatients = async (search?: string): Promise<Patient[]> => {
    const response = await api.get('/patients', { params: { search } });
    return response.data;
};

export const getPatientById = async (id: string): Promise<Patient> => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
};

export const createPatient = async (patientData: Omit<Patient, '_id'>): Promise<Patient> => {
    const response = await api.post('/patients', patientData);
    return response.data;
};

export const updatePatient = async (id: string, patientData: Partial<Patient>): Promise<Patient> => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
};