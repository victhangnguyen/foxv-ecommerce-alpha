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
    type: Number,
    // enum: ['user', 'subscriber', 'admin'],
    //! guess: 0 - user: 1 - subscriber: 2 - admin: 5
    default: 1,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
