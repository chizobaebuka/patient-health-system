import React from 'react';
import { AuthorizationRequest } from '../types';

interface AuthorizationRequestListProps {
    requests: AuthorizationRequest[];
    onUpdateRequest: (id: string, status: 'approved' | 'denied') => void;
}

const AuthorizationRequestList: React.FC<AuthorizationRequestListProps> = ({ requests, onUpdateRequest }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-primary-100 text-primary-800">Authorization Requests</h2>
            <ul className="divide-y divide-gray-200">
                {requests.map((request) => (
                    <li key={request._id} className="p-4">
                        <h3 className="font-medium text-lg text-foreground">{request.treatmentType}</h3>
                        <p className="text-sm text-gray-600">Patient ID: {request.patientId}</p>
                        <p className="text-sm text-gray-600">Status: {request.status}</p>
                        <p className="text-sm text-gray-600">Date of Service: {new Date(request.dateOfService).toLocaleDateString()}</p>
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => onUpdateRequest(request._id, 'approved')}
                                className="px-3 py-1 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onUpdateRequest(request._id, 'denied')}
                                className="px-3 py-1 bg-accent-500 text-white rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-colors"
                            >
                                Deny
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorizationRequestList;