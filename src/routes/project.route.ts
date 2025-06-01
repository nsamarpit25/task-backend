import { Router } from "express";
import { getAllProjects, addProject, deleteProjectById } from "../controllers/project.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getAllProjects);
router.post("/", authenticate, addProject);
router.delete('/:id', authenticate, deleteProjectById)

export default router;
