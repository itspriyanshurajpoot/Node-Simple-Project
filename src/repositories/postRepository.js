import Post from "../models/postSchema.js";
import { CustomError } from "../errors/CustomError.js";

export const addPost = async (postData) => {
    try {
        const post = await Post.create(postData);
        return post;
    } catch (error) {
        throw new CustomError("Error adding post", 500);
    }
}

export const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('user', 'email name');
        return post;
    } catch (error) {
        throw new CustomError("Error fetching post by ID", 500);
    }   
}

export const findAllPosts = async () => {
    try {
        const posts = await Post.find({}).populate('user', 'email name');
        return posts;
    } catch (error) {
        throw new CustomError("Error fetching all posts", 500);
    }
}

export const updatePost = async (postId, updateData) => {
    try {
        const post = await Post.findByIdAndUpdate(postId, updateData, { new: true });
        return post;
    }
    catch (error) {
        throw new CustomError("Error updating post", 500);
    }
}

export const deletePost = async (postId) => {
    try {
        return await Post.findByIdAndDelete(postId);
    } catch (error) {
        throw new CustomError("Error deleting post", 500);
    }
}

export const findAllPostsByUserId = async (userId) => {
    try {
        const posts = await Post.find({ user: userId }).populate('user', 'email name');
        return posts;
    } catch (error) {
        throw new CustomError("Error fetching posts by user ID", 500);
    }
}