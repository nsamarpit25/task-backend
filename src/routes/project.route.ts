import { Router } from "express";
import { getAllProjects, addProject } from "../controllers/project.controller";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getAllProjects); // GET /api/projects
router.post("/", authenticate, addProject); // POST /api/projects

export default router;
