import api from './api';
import { AuthorizationRequest } from '../types';

export const createAuthorizationRequest = async (data: Omit<AuthorizationRequest, '_id' | 'createdAt' | 'updatedAt'>): Promise<AuthorizationRequest> => {
    const response = await api.post('/authorizations', data);
    return response.data;
};

export const getAuthorizationRequests = async (): Promise<AuthorizationRequest[]> => {
    const response = await api.get('/authorizations');
    return response.data;
};

export const updateAuthorizationRequest = async (id: string, data: Partial<AuthorizationRequest>): Promise<AuthorizationRequest> => {
    const response = await api.put(`/authorizations/${id}`, data);
    return response.data;
};