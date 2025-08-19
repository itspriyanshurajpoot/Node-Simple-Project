import { CustomError } from "../errors/CustomError.js";
import User from "../models/userSchema.js"

export const registerUser = async (userData) => {
    try {
        const user = User.create(userData);
        return user;
    } catch (error) {
        throw new CustomError("Error registering user", 500);
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new CustomError("Error finding user by email", 500);
    }
}

export const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new CustomError("Error finding user by ID", 500);
    }
}

export const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    } catch (error) {
        throw new CustomError("Error updating user", 500);
    }
}

export const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new CustomError("Error deleting user", 500);
    }
}

export const getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw new CustomError("Error fetching all users", 500);
    }
}