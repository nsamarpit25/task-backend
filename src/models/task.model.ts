import type { Priority } from '@prisma/client';
import prisma from "../lib/prisma";

export const getTasksByProject = async (projectId: number) => {
   return prisma.task.findMany({ where: { projectId } });
};

export const createTask = async (data: {
   title: string;
   description?: string;
   priority: Priority;
   assignedToId?: number | null;
   projectId: number;
}) => {
   return prisma.task.create({ data });
};

export const updateTask = async (taskId: number, updates: any) => {
   return prisma.task.update({
      where: { id: taskId },
      data: updates,
   });
};

export const deleteTask = async (taskId: number) => {
   return prisma.task.delete({ where: { id: taskId } });
};
