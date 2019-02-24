import { gql } from 'apollo-server-express';

export default gql`
  # Users Queries
  extend type Query {
    # Find one user by their id (must match exactly)
    user(id: ID!): User
    users: [User!]!
    me: User
  }
  extend type Mutation {
    signUp(userName: String!, phoneNumber: String!, password: String!): User
    signIn(phoneNumber: String!, password: String!): User
    signOut: Boolean
  }
  type User {
    # Get all users
    id: ID!
    userName: String!
    phoneNumber: String!
    createdAt: String!
  }
`;
