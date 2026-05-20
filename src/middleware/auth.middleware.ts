import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        role: "contributor" | "maintainer";
      };
    }
  }
}


export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Protected endpoint reject requests without a valid JWT"
      });
    }

  
    const decoded = jwt.verify(token, config.jwt_secret) as any;
    
    
    req.user = {
      id: decoded.id,
      name: decoded.name,
      role: decoded.role
    };

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      errors: error.message
    });
  }
};

export const restrictToMaintainer = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role !== "maintainer") {
    return res.status(403).json({
      success: false,
      message: "Role verification occurs before privileged operations. Access denied."
    });
  }
  next();
};
