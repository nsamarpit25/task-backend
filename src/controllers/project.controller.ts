import { Request, Response } from "express";
import { getProjectsByUser, createProject } from "../models/project.model";

export const getAllProjects = async (req: Request, res: Response) => {
   const userId = (req as any).userId;

   try {
      const projects = await getProjectsByUser(userId);
      res.json(projects);
   } catch {
      res.status(500).json({ message: "Failed to load projects" });
   }
};

export const addProject = async (req: Request, res: Response) => {
   const userId = (req as any).userId;
   const { name } = req.body;

   if (!name){
      res.status(400).json({ message: "Project name is required" });
      return
   }

   try {
      const newProject = await createProject(userId, name);
      res.status(201).json(newProject);
   } catch {
      res.status(500).json({ message: "Failed to create project" });
   }
};
