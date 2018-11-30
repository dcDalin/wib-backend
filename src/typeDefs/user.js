import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    signUp(userName: String!, userEmail: String! phoneNumber: String!, password: String!): User
  }
  type User {
    userId: ID!
    userName: String!
    userEmail: String!
    phoneNumber: String!
    createdAt: String!
    lastLogin: String!
  }
`
