import type { Request, Response } from 'express';
import { getAllUsersList } from '../models/user.model'

export const getAllUsers = async (req: Request, res: Response) => {
   try {
      const users = await getAllUsersList();
      res.json(users)
   } catch (err) {
      console.log(err)
      res.status(500).json({message: 'Unable to get you users list'})
   }
}