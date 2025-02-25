import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) throw new Error("Authorization token required");

  try {
    const user = jwt.verify(authHeader, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error("Invalid/Expired token");
  }
};

export default authMiddleware;
