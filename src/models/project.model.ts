import prisma from "../lib/prisma";

export const getProjectsByUser = async (userId: number) => {
   return prisma.project.findMany({
      where: { ownerId: userId },
      include: { tasks: true }, // optional: eager load tasks
   });
};

export const createProject = async (userId: number, name: string) => {
   return prisma.project.create({
      data: {
         name,
         ownerId: userId,
      },
   });
};
