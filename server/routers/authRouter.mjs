import express from 'express';
import { registerUser } from '../utils/userUtils.mjs';
import { generateToken } from '../utils/authUtils.mjs';
import User from '../DB/schemas/User.mjs';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const { username, passwordHash, email, userType, profile, lawyerInfo, judgeInfo } = req.body;
    const userData = { username, passwordHash, email, userType, profile, lawyerInfo, judgeInfo };

    const result = await registerUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { username, passwordHash } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.passwordHash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default authRouter;