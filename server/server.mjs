import express from 'express';
import connectDB from './DB/Connection.mjs';
import cors from 'cors';

import authRouter from './routers/authRouter.mjs';
import userRouter from './routers/userRouter.mjs';
import lawyerRouter from './routers/lawyerRouter.mjs';
import judgeRouter from './routers/judgeRouter.mjs';
import caseRouter from './routers/caseRouter.mjs';
import courtProgressRouter from './routers/courtProgressRouter.mjs';
import geminiRouter from './routers/geminiRouter.mjs'

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/lawyer', lawyerRouter);
app.use('/judge', judgeRouter);
app.use('/case', caseRouter);
app.use('/progress', courtProgressRouter);
app.use('/gemini',geminiRouter)

app.get('/', (_req, res) => {
  res.send('Justicia API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));