import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import authMiddleware from "../middlewares/auth.js";

dotenv.config();
 
const userResolvers = {
  Query: {
    getProfile: async (_, __, context) => {

      const user = authMiddleware(context);
      return await User.findById(user.id);
    },
  },
  Mutation: {
    register: async (_, { name, email, password, profilePicture },) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, profilePicture });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      return { token, user };
    },
  },
};

export default userResolvers;
