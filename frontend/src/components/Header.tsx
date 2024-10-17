import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-primary-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight">HealthCare Pro</Link>
                <nav className="space-x-4">
                    {user ? (
                        <>
                            <Link to="/" className="hover:text-primary-200 transition-colors">Dashboard</Link>
                            <Link to="/authorizations" className="hover:text-primary-200 transition-colors">Authorizations</Link>
                            <button onClick={logout} className="hover:text-primary-200 transition-colors">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-primary-200 transition-colors">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;