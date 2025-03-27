import express from 'express';
import mongoose from 'mongoose';
import { updateJudge, deleteJudge, getJudgeById, listJudges } from '../utils/judgeUtils.mjs';

const judgeRouter = express.Router();

judgeRouter.get('/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const judge = await getJudgeById(req.params.userId);
    res.status(200).json(judge);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

judgeRouter.get('/', async (_req, res) => {
  try {
    const judges = await listJudges();
    res.status(200).json(judges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

judgeRouter.put('/update/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const result = await updateJudge(req.params.userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

judgeRouter.delete('/delete/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const result = await deleteJudge(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default judgeRouter;
