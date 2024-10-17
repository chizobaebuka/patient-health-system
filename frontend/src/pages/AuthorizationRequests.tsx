import React, { useState, useEffect } from 'react';
import { getAuthorizationRequests, updateAuthorizationRequest, createAuthorizationRequest } from '../services/authorizationService';
import AuthorizationRequestList from '../components/AuthorizationRequestList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { AuthorizationRequest } from '../types';

const AuthorizationRequests: React.FC = () => {
    const [requests, setRequests] = useState<AuthorizationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for the new request form
    const [newRequest, setNewRequest] = useState({
        patientId: '',
        treatmentType: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
        doctorNotes: '',
        status: 'pending',
    });

    useEffect(() => {
        fetchAuthorizationRequests();
    }, []);

    const fetchAuthorizationRequests = async () => {
        try {
            setLoading(true);
            const data = await getAuthorizationRequests();
            setRequests(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch authorization requests');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRequest = async (id: string, status: 'approved' | 'denied') => {
        try {
            await updateAuthorizationRequest(id, { status });
            fetchAuthorizationRequests(); // Refresh the requests after updating
        } catch (err) {
            setError('Failed to update authorization request');
        }
    };

    // Handle form submission for creating a new request
    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const createdRequest = await createAuthorizationRequest({
                ...newRequest,
                status: 'pending',
            });
            setRequests([...requests, createdRequest]); // Add the new request to the list
            setNewRequest({
                patientId: '',
                treatmentType: '',
                insurancePlan: '',
                dateOfService: '',
                diagnosisCode: '',
                doctorNotes: '',
                status: 'pending',
            }); // Reset the form
        } catch (err) {
            setError('Failed to create authorization request');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewRequest((prevRequest) => ({
            ...prevRequest,
            [name]: value,
        }));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Authorization Requests</h1>

            {/* Form to create a new authorization request */}
            <form onSubmit={handleCreateRequest} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Create Authorization Request</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input
                        type="text"
                        name="patientId"
                        value={newRequest.patientId}
                        onChange={handleInputChange}
                        placeholder="Patient ID"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="treatmentType"
                        value={newRequest.treatmentType}
                        onChange={handleInputChange}
                        placeholder="Treatment Type"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="insurancePlan"
                        value={newRequest.insurancePlan}
                        onChange={handleInputChange}
                        placeholder="Insurance Plan"
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="date"
                        name="dateOfService"
                        value={newRequest.dateOfService}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="diagnosisCode"
                        value={newRequest.diagnosisCode}
                        onChange={handleInputChange}
                        placeholder="Diagnosis Code"
                        className="border rounded p-2"
                        required
                    />
                    <textarea
                        name="doctorNotes"
                        value={newRequest.doctorNotes}
                        onChange={handleInputChange}
                        placeholder="Doctor's Notes"
                        className="border rounded p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                >
                    Create Request
                </button>
            </form>

            <AuthorizationRequestList requests={requests} onUpdateRequest={handleUpdateRequest} />
        </div>
    );
};

export default AuthorizationRequests;
