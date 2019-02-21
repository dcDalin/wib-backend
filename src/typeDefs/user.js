import { gql } from 'apollo-server-express';

export default gql`
  # Users Queries
  extend type Query {
    # Find one user by their id (must match exactly)
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    signUp(
      userName: String!
      userEmail: String!
      phoneNumber: String!
      password: String!
    ): User
  }
  type User {
    # Get all users
    id: ID!
    userName: String!
    userEmail: String!
    phoneNumber: String!
    createdAt: String!
  }
`;
