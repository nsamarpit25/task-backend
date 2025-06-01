import { Request, Response } from "express";
import {
   getTasksByProject,
   createTask,
   updateTask,
   deleteTask,
   getAllTheTasksAssignedToUser,
} from "../models/task.model";

export const getTasksByUserId = async (req: Request, res: Response) =>{
   const userId = Number((req as any).userId);

   try {
      const user = await getAllTheTasksAssignedToUser(userId);
      res.json(user?.tasks);
   } catch (err){
      console.log(err);
      res.send(500).json({message: 'Failed to get tasks'})
   }
}

export const getTasks = async (req: Request, res: Response) => {
   const projectId = Number(req.query.projectId);
   if (!projectId){
      res.status(400).json({ message: "Project ID required" });
      return
   }

   try {
      const tasks = await getTasksByProject(projectId);
      res.json(tasks);
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Failed to fetch tasks" });
   }
};

export const addTask = async (req: Request, res: Response) => {
   const { title, description, priority, assignedToId, projectId } = req.body;

   if (!title || !priority || !projectId) {
      res.status(400).json({ message: "Missing required fields" });
      return
   }

   try {
      const newTask = await createTask({
         title,
         description,
         priority,
         assignedToId: assignedToId || null,
         projectId,
      });

      res.status(201).json(newTask);
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Failed to create task" });
   }
};

export const updateTaskById = async (req: Request, res: Response) => {
   const taskId = Number(req.params.id);
   const updates = req.body;

   try {
      const updated = await updateTask(taskId, updates);
      res.json(updated);
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Failed to update task" });
   }
};

export const deleteTaskById = async (req: Request, res: Response) => {
   const taskId = Number(req.params.id);

   try {
      await deleteTask(taskId);
      res.json({ message: "Task deleted" });
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Failed to delete task" });
   }
};
