import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return
   }

   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      (req as any).userId = decoded.userId;
      next();
   } catch {
      res.status(401).json({ message: "Invalid or expired token" });
      return
   }
};
