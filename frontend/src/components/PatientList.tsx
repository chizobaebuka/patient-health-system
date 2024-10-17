import React from 'react';
import { Patient } from '../types';

interface PatientListProps {
    patients: Patient[];
    onSelectPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onSelectPatient }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-primary-100 text-primary-800">Patients</h2>
            <ul className="divide-y divide-gray-200">
                {patients.map((patient) => (
                    <li
                        key={patient._id}
                        className="p-4 hover:bg-primary-50 cursor-pointer transition-colors"
                        onClick={() => onSelectPatient(patient)}
                    >
                        <h3 className="font-medium text-lg text-foreground">{patient.name}</h3>
                        <p className="text-sm text-gray-600">Age: {patient.age}</p>
                        <p className="text-sm text-gray-600">Condition: {patient.condition}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;