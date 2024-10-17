export interface Patient {
    _id: string;
    name: string;
    age: number;
    condition: string;
    medicalHistory: string[];
    treatmentPlan: string;
}

export interface AuthorizationRequest {
    _id: string;
    patientId: string;
    treatmentType: string;
    insurancePlan: string;
    dateOfService: string;
    diagnosisCode: string;
    status: 'pending' | 'approved' | 'denied';
    doctorNotes: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    email: string;
}