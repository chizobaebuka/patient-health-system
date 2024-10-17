import React, { useState } from 'react';
import { createAuthorizationRequest } from '../services/authorizationService'; // Adjust the import path as needed
import { AuthorizationRequest } from '../types';
import mongoose from 'mongoose';

interface CreateAuthorizationRequestFormProps {
    patientId: string;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateAuthorizationRequestForm: React.FC<CreateAuthorizationRequestFormProps> = ({ patientId, onClose, onSuccess }) => {
    const [treatmentType, setTreatmentType] = useState('');
    const [dateOfService, setDateOfService] = useState('');
    const [diagnosisCode, setDiagnosisCode] = useState('');
    const [doctorNotes, setDoctorNotes] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newRequest: AuthorizationRequest = {
            _id: new mongoose.Types.ObjectId().toString(),
            patientId,
            treatmentType,
            dateOfService: new Date(dateOfService).toISOString(),
            diagnosisCode,
            status: 'pending', // Default status
            doctorNotes,
            insurancePlan: '',
            createdAt: '',
            updatedAt: ''
        };

        try {
            await createAuthorizationRequest(newRequest);
            onSuccess(); // Notify success and refresh the request list
        } catch (error) {
            setError('Failed to create authorization request. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create Authorization Request</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Treatment Type</label>
                        <input
                            type="text"
                            value={treatmentType}
                            onChange={(e) => setTreatmentType(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Service</label>
                        <input
                            type="date"
                            value={dateOfService}
                            onChange={(e) => setDateOfService(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Diagnosis Code</label>
                        <input
                            type="text"
                            value={diagnosisCode}
                            onChange={(e) => setDiagnosisCode(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Doctor Notes</label>
                        <textarea
                            value={doctorNotes}
                            onChange={(e) => setDoctorNotes(e.target.value)}
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
            </div>
        </div>
    );
};

export default CreateAuthorizationRequestForm;
