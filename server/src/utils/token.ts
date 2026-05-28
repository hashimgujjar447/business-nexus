import jwt, { Secret } from "jsonwebtoken";

interface TokenPayload {
  _id: string;
  email: string;
  role: string;
}

// ========================================
// Generate Access Token
// ========================================

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, {
    expiresIn: "15m",
  });
};

// ========================================
// Generate Refresh Token
// ========================================

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: "7d",
  });
};
