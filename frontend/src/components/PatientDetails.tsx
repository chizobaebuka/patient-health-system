import React from 'react';
import { Patient } from '../types';

interface PatientDetailsProps {
    patient: Patient;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary-800">{patient.name}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="font-medium text-gray-700">Age:</p>
                    <p className="text-foreground">{patient.age}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-700">Condition:</p>
                    <p className="text-foreground">{patient.condition}</p>
                </div>
            </div>
            <div className="mb-4">
                <p className="font-medium text-gray-700 mb-2">Medical History:</p>
                <ul className="list-disc list-inside text-foreground">
                    {patient.medicalHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="font-medium text-gray-700 mb-2">Treatment Plan:</p>
                <p className="text-foreground">{patient.treatmentPlan}</p>
            </div>
        </div>
    );
};

export default PatientDetails;