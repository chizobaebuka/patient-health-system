import React, { useState, useEffect } from 'react';
import { getAuthorizationRequests, updateAuthorizationRequest } from '../services/authorizationService';
import AuthorizationRequestList from '../components/AuthorizationRequestList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { AuthorizationRequest } from '../types';

const AuthorizationRequests: React.FC = () => {
    const [requests, setRequests] = useState<AuthorizationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            fetchAuthorizationRequests();
        } catch (err) {
            setError('Failed to update authorization request');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Authorization Requests</h1>
            <AuthorizationRequestList requests={requests} onUpdateRequest={handleUpdateRequest} />
        </div>
    );
};

export default AuthorizationRequests;