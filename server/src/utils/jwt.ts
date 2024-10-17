import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT secret key is missing');
    }
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};
