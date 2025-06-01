import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
      const user = await findUserByEmail(email);
      if (!user){
         res.status(401).json({ message: "Invalid credentials" });
         return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match){
         res.status(401).json({ message: "Invalid credentials" });
         return

      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
         expiresIn: "1h",
      });

      res.json({ token });
   } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Server error" });
   }
};
