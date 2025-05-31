import { Router } from "express";
import {
   getTasks,
   addTask,
   updateTaskById,
   deleteTaskById,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getTasks); // GET /api/tasks?projectId=...
router.post("/", authenticate, addTask); // POST /api/tasks
router.put("/:id", authenticate, updateTaskById); // PUT /api/tasks/:id
router.delete("/:id", authenticate, deleteTaskById); // DELETE /api/tasks/:id

export default router;
