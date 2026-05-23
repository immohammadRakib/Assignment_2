import type { Request, Response } from "express";
import authService from "../service/auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";


export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await authService.createUser(req.body);
    
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Registration failed",
      errors: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      config.jwt_secret || "secret", 
      { expiresIn: "1d" }
    );

    
    delete user.password;

    // Standard Success Response (200 OK)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      errors: error.message
    });
  }
};
