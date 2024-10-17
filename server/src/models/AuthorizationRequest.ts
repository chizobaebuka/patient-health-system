import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthorizationRequest extends Document {
    patientId: mongoose.Types.ObjectId;
    treatmentType: string;
    insurancePlan: string;
    dateOfService: Date;
    diagnosisCode: string;
    status: 'pending' | 'approved' | 'denied';
    doctorNotes: string;
}

const AuthorizationRequestSchema: Schema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    doctorNotes: { type: String },
}, { timestamps: true });

export default mongoose.model<IAuthorizationRequest>('AuthorizationRequest', AuthorizationRequestSchema);