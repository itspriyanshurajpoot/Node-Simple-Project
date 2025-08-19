import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError.js';
import { SECRET_KEY } from '../config/allConfig.js';

export const generateJWT = (payload) => {
    try {
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '1h' // Token expiration time
        });
        return token;
    } catch (error) {
        throw new CustomError("Error generating JWT", 500);
    }
}

export const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new CustomError("Invalid or expired token", 401);
    }
}