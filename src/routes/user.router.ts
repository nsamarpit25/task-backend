import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

export default usersRouter;