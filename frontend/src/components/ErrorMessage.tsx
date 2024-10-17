import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-accent-100 border-l-4 border-accent-500 text-accent-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;