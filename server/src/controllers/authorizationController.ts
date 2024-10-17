import { Request, Response } from 'express';
import AuthorizationRequest, { IAuthorizationRequest } from '../models/AuthorizationRequest';

export const createAuthorizationRequest = async (req: Request, res: Response) => {
    try {
        const newRequest: IAuthorizationRequest = new AuthorizationRequest(req.body);
        // const existingRequest: IAuthorizationRequest | null = await AuthorizationRequest.findById(req.params.id);
        // if (existingRequest) {
        //     res.status(409).json({ message: 'Authorization request already exists' });
        //     return;
        // }
        await newRequest.save();
        res.status(201).json({
            status:'success',
            message: 'Authorization request created successfully',
            data: newRequest,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating authorization request', error });
    }
};

export const getAuthorizationRequests = async (req: Request, res: Response) => {
    try {
        const requests: IAuthorizationRequest[] = await AuthorizationRequest.find().populate('patientId');
        res.json({
            status:'success',
            message: 'Authorization requests fetched successfully',
            data: requests,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authorization requests', error });
    }
};

export const getAuthorizationRequestById = async (req: Request, res: Response): Promise<void> => {
    try {
        const request: IAuthorizationRequest | null = await AuthorizationRequest.findById(req.params.id);
        if (!request) {
            res.status(404).json({ message: 'Authorization request not found' });
            return;
        }
        res.json({
            status:'success',
            message: 'Authorization request fetched successfully',
            data: request,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authorization request', error });
    }
}

export const updateAuthorizationRequest = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedRequest: IAuthorizationRequest | null = await AuthorizationRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRequest) {
            res.status(404).json({ message: 'Authorization request not found' });
            return;
        }
        res.json({
            status:'success',
            message: 'Authorization request updated successfully',
            data: updatedRequest,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating authorization request', error });
    }
};