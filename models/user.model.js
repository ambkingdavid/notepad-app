import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
