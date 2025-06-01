import { Router } from "express";
import {
   getTasks,
   addTask,
   updateTaskById,
   deleteTaskById,
   getTasksByUserId,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get('/me', authenticate, getTasksByUserId)
router.get("/", authenticate, getTasks);
router.post("/", authenticate, addTask);
router.put("/:id", authenticate, updateTaskById);
router.delete("/:id", authenticate, deleteTaskById);

export default router;
