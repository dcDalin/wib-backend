import mongoose from 'mongoose'

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
)

export default mongoose.model('User', userSchema)
