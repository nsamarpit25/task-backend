import prisma from "../lib/prisma";

export const getProjectsByUser = async (userId: number) => {
   return prisma.project.findMany({
      where: { ownerId: userId },
      include: { tasks: {
         include: {
            assignedTo: true
         }
      }},
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

export const deleteProject = async (projectId: number) => {
   await prisma.task.deleteMany({where: {projectId: projectId}})

   return prisma.project.delete({where: {id: projectId}}, )
}