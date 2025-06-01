import prisma from "../lib/prisma";

export const findUserByEmail = async (email: string) => {
   return prisma.user.findUnique({ where: { email } });
};

export const getAllUsersList = async () => {
   return prisma.user.findMany({ select: {
      name: true,
      id: true,
   }})
}