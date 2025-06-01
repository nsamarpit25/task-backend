import { Request, Response } from "express";
import { getProjectsByUser, createProject, deleteProject } from "../models/project.model";

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
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Failed to create project" });
   }
};

export const deleteProjectById = async (req: Request, res: Response) => {
   const userId = (req as any).userId;
   const projectId = Number(req.params.id);

   try {
      const projects = await getProjectsByUser(userId);
      const projectToDelete = projects.find(project => project.id === projectId) || null;

      if (!projectToDelete) {
         res.status(404).json({ message: 'Project not found' });
         return
      }

      await deleteProject(projectId);
      res.json({ message: 'Project Deleted' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete project' });
   }
}
