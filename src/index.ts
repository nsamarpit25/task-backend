import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routes/auth.router';
import projectRoute from './routes/project.route';
import taskRouter from './routes/task.route'
import usersRouter from './routes/user.router';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
   res.send("API is running...");
});

app.use('/api/auth', authRouter);
app.use('/api/projects', projectRoute)
app.use('/api/tasks', taskRouter)
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
   console.log(`Server started....`);
});