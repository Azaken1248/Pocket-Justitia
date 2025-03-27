import User from '../DB/schemas/User.mjs';
import Lawyer from '../DB/schemas/Lawyer.mjs'
import Judge from '../DB/schemas/Judge.mjs'

import { generateToken, verifyToken } from './authUtils.mjs';

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) throw new Error('Username already exists');

  const newUser = new User(userData);
  await newUser.save();

  if (userData.userType === 'lawyer') {
    const lawyer = new Lawyer({ userId: newUser._id, ...userData.lawyerInfo });
    await lawyer.save();
    newUser.lawyerId = lawyer._id;
  } else if (userData.userType === 'judge') {
    const judge = new Judge({ userId: newUser._id, ...userData.judgeInfo });
    await judge.save();
    newUser.judgeId = judge._id;
  }

  await newUser.save();
  return { user: newUser, token: generateToken(newUser._id) };
};

const deleteUser = async (userId, token) => {
  verifyToken(token);
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  await User.deleteOne({ _id: userId });

  if (user.userType === 'lawyer') {
    await Lawyer.deleteOne({ userId });
  } else if (user.userType === 'judge') {
    await Judge.deleteOne({ userId });
  }

  return { message: 'User deleted successfully' };
};

const updateUser = async (userId, updateData, token) => {
  verifyToken(token);
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  Object.assign(user, updateData);
  await user.save();

  if (user.userType === 'lawyer' && updateData.lawyerInfo) {
    await Lawyer.findOneAndUpdate({ userId }, updateData.lawyerInfo);
  } else if (user.userType === 'judge' && updateData.judgeInfo) {
    await Judge.findOneAndUpdate({ userId }, updateData.judgeInfo);
  }

  return { message: 'User updated successfully', user };
};

export { registerUser, deleteUser, updateUser };
