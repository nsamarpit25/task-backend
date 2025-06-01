import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
   // Clear existing data
   await prisma.task.deleteMany();
   await prisma.project.deleteMany();
   await prisma.user.deleteMany();

   // Create users with different roles
   const users = await Promise.all([
      prisma.user.create({
         data: {
            email: "john.doe@company.com",
            password: await bcrypt.hash("password123", 10),
            name: 'John Doe',
         },
      }),
      prisma.user.create({
         data: {
            email: "sarah.smith@company.com",
            password: await bcrypt.hash("password123", 10),
            name: 'Sarah Smith',
         },
      }),
      prisma.user.create({
         data: {
            email: "mike.johnson@company.com",
            password: await bcrypt.hash("password123", 10),
            name: 'Mike Johnson',
         },
      }),
   ]);

   // Create projects
   const projects = await Promise.all([
      prisma.project.create({
         data: {
            name: "Website Redesign",
            ownerId: users[0].id,
         },
      }),
      prisma.project.create({
         data: {
            name: "Q2 Marketing Campaign",
            ownerId: users[1].id,
         },
      }),
      prisma.project.create({
         data: {
            name: "Employee Onboarding System",
            ownerId: users[2].id,
         },
      }),
   ]);

   // Create tasks for Website Redesign project
   await prisma.task.createMany({
      data: [
         {
            title: "Design new homepage layout",
            description: "Create wireframes and mockups for the new homepage design",
            priority: "HIGH",
            completed: false,
            projectId: projects[0].id,
            assignedToId: users[0].id,
         },
         {
            title: "Implement responsive navigation",
            description: "Develop mobile-friendly navigation menu with hamburger icon",
            priority: "HIGH",
            completed: false,
            projectId: projects[0].id,
            assignedToId: users[0].id,
         },
         {
            title: "Optimize images and assets",
            description: "Compress and optimize all website images for better performance",
            priority: "MEDIUM",
            completed: true,
            projectId: projects[0].id,
            assignedToId: users[1].id,
         },
         {
            title: "Update content for all pages",
            description: "Review and update copy for all main website pages",
            priority: "MEDIUM",
            completed: false,
            projectId: projects[0].id,
            assignedToId: users[2].id,
         },
         {
            title: "Implement SEO improvements",
            description: "Add meta tags, improve page load speed, and implement schema markup",
            priority: "LOW",
            completed: false,
            projectId: projects[0].id,
            assignedToId: users[1].id,
         },
      ],
   });

   // Create tasks for Q2 Marketing Campaign
   await prisma.task.createMany({
      data: [
         {
            title: "Create social media content calendar",
            description: "Plan and schedule posts for Q2 across all social platforms",
            priority: "HIGH",
            completed: false,
            projectId: projects[1].id,
            assignedToId: users[1].id,
         },
         {
            title: "Design email newsletter template",
            description: "Create new email template for quarterly newsletter",
            priority: "HIGH",
            completed: true,
            projectId: projects[1].id,
            assignedToId: users[0].id,
         },
         {
            title: "Prepare press release",
            description: "Draft press release for new product launch",
            priority: "MEDIUM",
            completed: false,
            projectId: projects[1].id,
            assignedToId: users[2].id,
         },
         {
            title: "Update marketing materials",
            description: "Update brochures and sales decks with new branding",
            priority: "MEDIUM",
            completed: false,
            projectId: projects[1].id,
            assignedToId: users[1].id,
         },
         {
            title: "Schedule influencer meetings",
            description: "Coordinate with potential influencers for product promotion",
            priority: "LOW",
            completed: false,
            projectId: projects[1].id,
            assignedToId: users[0].id,
         },
      ],
   });

   // Create tasks for Employee Onboarding System
   await prisma.task.createMany({
      data: [
         {
            title: "Design onboarding workflow",
            description: "Create step-by-step workflow for new employee onboarding",
            priority: "HIGH",
            completed: false,
            projectId: projects[2].id,
            assignedToId: users[2].id,
         },
         {
            title: "Create training materials",
            description: "Develop training videos and documentation for new hires",
            priority: "HIGH",
            completed: false,
            projectId: projects[2].id,
            assignedToId: users[1].id,
         },
         {
            title: "Set up IT access templates",
            description: "Configure standard access rights and permissions for new employees",
            priority: "MEDIUM",
            completed: true,
            projectId: projects[2].id,
            assignedToId: users[0].id,
         },
         {
            title: "Create welcome package",
            description: "Design and prepare welcome materials for new employees",
            priority: "MEDIUM",
            completed: false,
            projectId: projects[2].id,
            assignedToId: users[2].id,
         },
         {
            title: "Schedule orientation sessions",
            description: "Plan and schedule department introduction sessions",
            priority: "LOW",
            completed: false,
            projectId: projects[2].id,
            assignedToId: users[1].id,
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

