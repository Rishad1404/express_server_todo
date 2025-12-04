// higher order function return korbe function k
import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import config from "../config";

//roles=["admin","user"]
const auth = (...roles:string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({ message: "You are not allowed!!!" });
      }
      const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
      console.log({ decoded });
      req.user = decoded ;

      if(roles.length && !roles.includes(decoded.role)){
        return res.status(500).json({
          error:"Unauthorized!!",
        });
      }
      next();
      
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};
export default auth;
