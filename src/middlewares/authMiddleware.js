import { findUserByEmail } from "../repositories/userRepository.js";
import { verifyJWT } from "../utils/jwt.js";

export const validateUser = async (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            message: "No token provided",
            success: false,
            data: null
        });
    }

    try {
        const decoded = verifyJWT(token);
        
        const isUserExists = await findUserByEmail(decoded.email);
        if (!isUserExists) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                data: null
            });
        }

        
        req.user = decoded;
        next();
    } catch (error) {
        throw new CustomError("Unauthorized access", 401);
    }
}

export const isAdmin = (re1, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Access denied, admin only",
            success: false,
            data: null
        });
    }

    next();
}