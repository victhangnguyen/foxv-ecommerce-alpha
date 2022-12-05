import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['user', 'subscriber', 'admin'],
    default: 'user',
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
