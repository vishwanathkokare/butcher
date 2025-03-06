import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

export const adminAuthenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};