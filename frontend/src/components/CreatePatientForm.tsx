import React, { useState } from 'react';
import { createPatient } from '../services/patientService';
import { createAuthorizationRequest, updateAuthorizationRequest } from '../services/authorizationService';
import { AuthorizationRequest, Patient } from '../types';
import AuthorizationRequestList from './AuthorizationRequestList';
import mongoose from 'mongoose';

const CreatePatientForm: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [condition, setCondition] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [authorizationRequests, setAuthorizationRequests] = useState<AuthorizationRequest[]>([]);

    const handleCreatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const historyArray = medicalHistory.split(',').map(item => item.trim());
        const newPatient: Patient = {
            _id: new mongoose.Types.ObjectId().toString(),
            name,
            age: Number(age),
            condition,
            medicalHistory: historyArray,
            treatmentPlan,
        };

        try {
            const createdPatient = await createPatient(newPatient);
            const authorizationRequestData: Omit<AuthorizationRequest, '_id' | 'createdAt' | 'updatedAt'> = {
                patientId: createdPatient._id,
                treatmentType: condition,
                status: 'pending',
                dateOfService: new Date().toISOString(),
                insurancePlan: '',
                diagnosisCode: '',
                doctorNotes: '',
            };

            await createAuthorizationRequest(authorizationRequestData);
            onSuccess();
        } catch (error) {
            console.error("Error creating patient or authorization request:", error);
        }
    };

    const handleUpdateRequest = async (requestId: string, status: "approved" | "denied") => {
        try {
            const updatedRequest = await updateAuthorizationRequest(requestId, { status });

            setAuthorizationRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === updatedRequest._id ? updatedRequest : request
                )
            );
        } catch (error) {
            console.error("Error updating authorization request:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleCreatePatient} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // This uses setName
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)} // This uses setAge
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)} // This uses setCondition
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Medical History (comma-separated)</label>
                    <textarea
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)} // This uses setMedicalHistory
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Treatment Plan</label>
                    <textarea
                        value={treatmentPlan}
                        onChange={(e) => setTreatmentPlan(e.target.value)} // This uses setTreatmentPlan
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Create
                    </button>
                </div>
            </form>

            {authorizationRequests.length > 0 && (
                <AuthorizationRequestList
                    requests={authorizationRequests}
                    onUpdateRequest={handleUpdateRequest}
                />
            )}
        </>
    );
};

export default CreatePatientForm;
