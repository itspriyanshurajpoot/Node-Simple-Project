import { addPostService, deletePostService, findAllPostsService, getPostByIdService, updatePostService } from "../services/postService.js";

export const createPost = async (req, res, next) => {
    try {
        const postData = req.body;
        postData.user = req.user.id;
        const post = await addPostService(postData);
        res.status(201).json({
            message: "Post created successfully",
            success: true,
            data: post
        });
    } catch (error) {
        if(error.statusCode) {
            next(error);
        }

        return res.status(500).json({
                message: "Internal server error",
                success: false,
                data: null
        });
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await getPostByIdService(postId);
        res.status(200).json({
            message: "Post fetched successfully",
            success: true,
            data: post
        });
    } catch (error) {
        if(error.statusCode) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            data: null
        });
    }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await findAllPostsService();
        res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            data: posts
        });
    } catch (error) {
        if(error.statusCode) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            data: null
        });
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const updateData = req.body;
        const post = await updatePostService(postId, updateData);
        res.status(200).json({
            message: "Post updated successfully",
            success: true,
            data: post
        });
    }
    catch (error) {
        if(error.statusCode) {
            next(error);
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            data: null
        });
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await deletePostService(postId, userId);
        res.status(200).json({
            message: "Post deleted successfully",
            success: true,
            data: post
        });
    }
    catch (error) {
        if(error.statusCode) {
            next(error);
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false,
            data: null
        });
    }
}

