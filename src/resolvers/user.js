import { UserInputError } from 'apollo-server-express';
import mongoose from 'mongoose';
import { User } from '../models';

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID`);
      }
      return User.findById(id);
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      return User.create(args);
    }
  }
};
