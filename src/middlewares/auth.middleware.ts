import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: string  | jwt.JwtPayload
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction):void => {
  try {
  const authHeader = req.headers.authorization?.split("")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({
        success:false,
       message: "No token provided" 
      });
      return;
    }

  const token = authHeader.split(" ")[1];
  
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET! as string, (error, user)=>{
    (req as any).user = user;
    next();
   });
  } catch(error){
    res.status(400).json(
      {
      success:false,
      message:"Invalid or expired token",
      error:error
    }
    )
   
  }
}

   
