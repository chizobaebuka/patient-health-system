import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
    name: string;
    age: number;
    condition: string;
    medicalHistory: string[];
    treatmentPlan: string;
}

const PatientSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true },
    medicalHistory: [{ type: String }],
    treatmentPlan: { type: String },
});

export default mongoose.model<IPatient>('Patient', PatientSchema);