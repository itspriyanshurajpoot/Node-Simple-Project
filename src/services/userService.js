import { CustomError } from "../errors/CustomError.js";
import { findUserByEmail, findUserById, registerUser, updateUser } from "../repositories/userRepository.js"
import { generateJWT } from "../utils/jwt.js";
import bcrypt from "bcryptjs";


export const registerUserService = async (userData) => {
    const user = await findUserByEmail(userData.email);
    if (user) {
        throw new CustomError("User already exists", 400);
    }

    return await registerUser(userData);
}

export const loginUserService = async (userData) => {
        
    const user = await getUserByEmailService(userData.email);
    console.log(user);
    
    if(!user) {
        throw new CustomError('Invalid email', 401);
    }

    const isPasswordValid = bcrypt.compareSync(userData.password, user.password);

    if(!isPasswordValid){
        throw new CustomError("Invalid Password", 401)
    }

    const token = generateJWT({id: user._id, email: user.email, password: user.password, role: user.role})
    return {
        user,
        token
    }
  
}

export const getUserByEmailService = async (email) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    return user;
}

export const getUserByIdService = async (userId) => {
    const user = await findUserById(userId);    
    if (!user) {
        throw new CustomError("User not found", 404);
    }

    return user;
}


export const updateUserService = async (userId, updateData) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    return await updateUser(userId, updateData);
}

export const deleteUserService = async (userId) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    return await deleteUser(userId);
}

export const getAllUsersService = async () => {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
        throw new CustomError("No users found", 404);
    }
    return users;
};