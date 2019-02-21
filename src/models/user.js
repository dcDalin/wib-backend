import { hash } from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      validate: {
        validator: async userName => User.doesntExist({ userName }),
        message: ({ value }) => `Username ${value} has already been taken.`
      }
    },
    userEmail: {
      type: String,
      validate: {
        validator: userEmail => User.doesntExist({ userEmail }),
        message: ({ value }) => `Email ${value} has already been taken.`
      }
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: phoneNumber => User.doesntExist({ phoneNumber }),
        message: ({ value }) => `Phone Number ${value} already exists.`
      }
    },
    password: String
  },
  {
    timestamps: true
  }
);

// use regular function so that this keyword
// refers to the user
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // args.password from our resolver
    this.password = await hash(this.password, 10);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments) === 0;
};

const User = mongoose.model('User', userSchema);

export default User;
