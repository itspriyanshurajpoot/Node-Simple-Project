import { Router } from "express";
import { createPost, getPostById, updatePost, deletePost, getAllPosts } from "../controllers/postController.js";
import { isAdmin, validateUser } from "../middlewares/authMiddleware.js";

const postRouter = Router();

postRouter.post("/", validateUser, createPost);
postRouter.get("/",validateUser, getAllPosts);
postRouter.get("/:id",validateUser, getPostById);
postRouter.put("/:id", validateUser, isAdmin, updatePost);
postRouter.delete("/:id",validateUser, deletePost);

export default postRouter;