import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
   // Clear existing data
   await prisma.task.deleteMany();
   await prisma.project.deleteMany();
   await prisma.user.deleteMany();

   // Create a main user
   const password = await bcrypt.hash("test123", 10);
   const user = await prisma.user.create({
      data: {
         email: "test@example.com",
         password,
      },
   });

   // Create 2 projects
   const project1 = await prisma.project.create({
      data: {
         name: "Personal Goals",
         ownerId: user.id,
      },
   });

   const project2 = await prisma.project.create({
      data: {
         name: "Work Tasks",
         ownerId: user.id,
      },
   });

   // Create mock user
   const mockUser = await prisma.user.create({
      data: {
         email: "mock@user.com",
         password: await bcrypt.hash("mockpass", 10),
      },
   });

   // Create tasks under project1
   await prisma.task.createMany({
      data: [
         {
            title: "Go to the gym",
            description: "Workout for 45 minutes",
            priority: "HIGH",
            completed: false,
            projectId: project1.id,
            assignedToId: user.id,
         },
         {
            title: "Read a book",
            description: "Finish 2 chapters",
            priority: "MEDIUM",
            completed: true,
            projectId: project1.id,
            assignedToId: user.id,
         },
         {
            title: "Meditate",
            description: "10 minutes meditation",
            priority: "LOW",
            completed: false,
            projectId: project1.id,
            assignedToId: mockUser.id,
         },
      ],
   });

   // Create tasks under project2
   await prisma.task.createMany({
      data: [
         {
            title: "Finish report",
            description: "Complete quarterly performance report",
            priority: "HIGH",
            completed: false,
            projectId: project2.id,
            assignedToId: user.id,
         },
         {
            title: "Client meeting",
            description: "Discuss project roadmap",
            priority: "MEDIUM",
            completed: true,
            projectId: project2.id,
            assignedToId: user.id,
         },
         {
            title: "Code review",
            description: "Review team PRs",
            priority: "LOW",
            completed: false,
            projectId: project2.id,
            assignedToId: mockUser.id,
         },
      ],
   });

   console.log("🌱 Test data seeded successfully");
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(() => prisma.$disconnect());
