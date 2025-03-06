import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_SECRET_PASSWORD = process.env.ADMIN_SECRET_PASSWORD;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const SALT_ROUNDS = 10;

const login = async (req, res) => {
  const { password } = req.body;

  // Validate input
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Hash the admin password (if not already hashed)
    const hashedPassword = await bcrypt.hash(ADMIN_SECRET_PASSWORD, SALT_ROUNDS);

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: "adminUserId" }, ADMIN_JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Return success response with token
    return res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Login error:", error);

    // Avoid exposing sensitive information in error messages
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login };