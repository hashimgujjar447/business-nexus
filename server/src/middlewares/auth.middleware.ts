import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ========================================
    // Check Refresh Token Cookie First
    // ========================================

    const refreshToken = req.cookies?.refresh;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // ========================================
    // Check Access Token
    // ========================================

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No access token provided",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    // ========================================
    // Verify Access Token
    // ========================================

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
