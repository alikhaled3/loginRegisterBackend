import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    profilePicture: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getProfile: User!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, profilePicture: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default userSchema;
