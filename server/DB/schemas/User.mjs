import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['normal', 'lawyer', 'judge'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profile: {
    name: { type: String },
    age: { type: Number },
    address: { type: String },
    phone: { type: String }
  },
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' },
  judgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Judge' },
  casesInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
});

const User = mongoose.model('User', userSchema);
export default User;