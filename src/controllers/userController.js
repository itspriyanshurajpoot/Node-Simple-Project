import { CustomError } from "../errors/CustomError.js";
import { getUserByEmailService, loginUserService, registerUserService } from "../services/userService.js";

export const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await registerUserService(userData);
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        if(error instanceof CustomError) {
            next(error);
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const response = await loginUserService(req.body);

        return res.status(200).json({
            success: true,
            messgage: "Login Successful",
            data: response.user,
            token: response.token
        })
    } catch (error) {
         console.log(error);
        if(error instanceof CustomError) {
            next(error);    
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmailService(email);
        return res.status(200).json({
            message: "User found",
            success: true,
            data: user
        });
    } catch (error) {
       
        
        if(error instanceof CustomError) {
            next(error);    
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
};
    
export const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await getUserByIdService(userId);
        return res.status(200).json({
            message: "User found",
            success: true,
            data: user
        });
    } catch (error) {
        if(error instanceof CustomError) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const updatedUser = await updateUserService(userId, updateData);
        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedUser
        });
    } catch (error) {
        if(error instanceof CustomError) {
            next(error);
        }

        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await deleteUserService(userId);
        return res.status(200).json({
            message: "User deleted successfully",
            success: true
        });
    } catch (error) {
        if(error instanceof CustomError) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }   
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            data: users
        });
    } catch (error) {
        if(error instanceof CustomError) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
            data: null
        });
    }
};