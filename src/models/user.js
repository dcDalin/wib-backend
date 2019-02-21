import { hash } from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    phoneNumber: String,
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
    try {
      // args.password from our resolver
      this.password = await hash(this.password, 10);
    } catch (err) {
      next(err);
    }
  }
  next();
});

export default mongoose.model('User', userSchema);
