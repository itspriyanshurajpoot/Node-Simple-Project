import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, loginUser, updateUser } from "../controllers/userController.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser)
router.post("/login", loginUser)
router.get("/:email", getUserByEmail);
router.delete("/:userId", deleteUser);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);

export default router;