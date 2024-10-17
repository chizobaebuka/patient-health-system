import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/patientService';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';
import PriorAuthorizationForm from '../components/PriorAuthorizationForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Patient } from '../types';

const PatientDashboard: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async (search?: string) => {
        try {
            setLoading(true);
            const data = await getPatients(search);
            setPatients(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchPatients(searchTerm);
    };

    const handleAuthorizationSubmit = () => {
        fetchPatients();
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Patient Dashboard</h1>
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search patients..."
                        className="px-4 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex-grow"
                    />
                    <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                        Search
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PatientList patients={patients} onSelectPatient={setSelectedPatient} />
                <div>
                    {selectedPatient && (
                        <>
                            <PatientDetails patient={selectedPatient} />
                            <div className="mt-8">
                                <PriorAuthorizationForm
                                    patientId={selectedPatient._id}
                                    onSubmitSuccess={handleAuthorizationSubmit}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;