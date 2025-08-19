import { addPost, findAllPosts, findAllPostsByUserId, getPostById, updatePost } from "../repositories/postRepository.js";
import { CustomError } from "../errors/CustomError.js";


export const addPostService = async (postData) => {
    const post = await addPost(postData);
    return post;
}

export const getPostByIdService = async (postId) => {
    const post = await getPostById(postId);
    if (!post) {
        throw new CustomError("Post not found", 404);
    }
    return post;
}

export const findAllPostByUserIdService = async (userId) => {
    const posts = await findAllPostsByUserId(userId);
    if (!posts || posts.length === 0) {
        throw new CustomError("No posts found for this user", 404);
    }
    
    return posts;
}

export const findAllPostsService = async () => {
    const posts = await findAllPosts();
    return posts;
}

export const updatePostService = async (postId, updateData) => {
    const isPostExists = await getPostById(postId);

    if (!isPostExists) {
        throw new CustomError("Post not found", 404);
    }

    const post = await updatePost(postId, updateData);
    console.log(`Post updated: ${post}`);

    return post;
}

export const deletePostService = async (postId, userId) => {
    const isPostExists = await getPostById(postId);

    if(!isPostExists) {
        throw new CustomError("Post not found", 404);
    }

    if (isPostExists.user.toString() !== userId) {
        throw new CustomError("You are not authorized to delete this post", 403);
    }

    const post = await deletePost(postId);
    console.log(`Post deleted: ${post}`);

    return post;
}