import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './src/config/dbConnection.js';
import userSchema from './src/schemas/userSchema.js';
import userResolvers from './src/resolvers/userResolvers.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs: userSchema,
  resolvers: userResolvers,
  context: ({ req }) => ({ req }),
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
})();


