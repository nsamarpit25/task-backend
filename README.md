# Task Management App API

A RESTful API for managing tasks, projects, and users in a task management application.

## Table of Contents

- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Projects](#projects)
  - [Tasks](#tasks)
- [Environment Variables](#environment-variables)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))
4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

## API Documentation

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Projects

#### Get All Projects

```http
GET /api/projects
Authorization: Bearer <token>
```

#### Create Project

```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name"
}
```

#### Update Project

```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project Name"
}
```

#### Delete Project

```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

### Tasks

#### Get Tasks by Project

```http
GET /api/tasks?projectId=1
Authorization: Bearer <token>
```

#### Get User's Tasks

```http
GET /api/tasks/me
Authorization: Bearer <token>
```

#### Create Task

```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "HIGH",
  "projectId": 1,
  "assignedToId": 2
}
```

#### Update Task

```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task Title",
  "description": "Updated Description",
  "priority": "MEDIUM",
  "completed": true
}
```

#### Delete Task

```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## Response Formats

### Success Response

```json
{
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "message": "Error message"
}
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_management"
JWT_SECRET="your-jwt-secret"
PORT=5000
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Data Models

### Task

```typescript
{
  id: number
  title: string
  description?: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  completed: boolean
  projectId: number
  assignedToId?: number
  createdAt: Date
  updatedAt: Date
}
```

### Project

```typescript
{
  id: number
  name: string
  ownerId: number
  createdAt: Date
  updatedAt: Date
}
```

### User

```typescript
{
  id: number
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}
```
