import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export { generateToken, verifyToken };
