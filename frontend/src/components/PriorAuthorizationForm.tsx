import React, { useState } from 'react';
import { createAuthorizationRequest } from '../services/authorizationService';

interface PriorAuthorizationFormProps {
    patientId: string;
    onSubmitSuccess: () => void;
}

const PriorAuthorizationForm: React.FC<PriorAuthorizationFormProps> = ({ patientId, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        treatmentType: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
        doctorNotes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAuthorizationRequest({
                ...formData, patientId,
                status: 'pending'
            });
            alert('Prior authorization request submitted successfully');
            onSubmitSuccess();
        } catch (error) {
            console.error('Error submitting prior authorization request:', error);
            alert('Error submitting prior authorization request');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary-800">Prior Authorization Request</h2>
            <div>
                <label htmlFor="treatmentType" className="block mb-1 font-medium text-gray-700">Treatment Type</label>
                <input
                    type="text"
                    id="treatmentType"
                    name="treatmentType"
                    value={formData.treatmentType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="insurancePlan" className="block mb-1 font-medium text-gray-700">Insurance Plan</label>
                <input
                    type="text"
                    id="insurancePlan"
                    name="insurancePlan"

                    value={formData.insurancePlan}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="dateOfService" className="block mb-1 font-medium text-gray-700">Date of Service</label>
                <input
                    type="date"
                    id="dateOfService"
                    name="dateOfService"
                    value={formData.dateOfService}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="diagnosisCode" className="block mb-1 font-medium text-gray-700">Diagnosis Code</label>
                <input
                    type="text"
                    id="diagnosisCode"
                    name="diagnosisCode"
                    value={formData.diagnosisCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="doctorNotes" className="block mb-1 font-medium text-gray-700">Doctor's Notes</label>
                <textarea
                    id="doctorNotes"
                    name="doctorNotes"
                    value={formData.doctorNotes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
            </div>
            <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                Submit Request
            </button>
        </form>
    );
};

export default PriorAuthorizationForm;