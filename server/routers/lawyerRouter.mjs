import express from 'express';
import mongoose from 'mongoose';
import { updateLawyer, deleteLawyer, getLawyerById, listLawyers } from '../utils/lawyerUtils.mjs';

const lawyerRouter = express.Router();

lawyerRouter.get('/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const lawyer = await getLawyerById(req.params.userId);
    res.status(200).json(lawyer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

lawyerRouter.get('/', async (req, res) => {
  try {
    const lawyers = await listLawyers();
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

lawyerRouter.put('/update/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const result = await updateLawyer(req.params.userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

lawyerRouter.delete('/delete/:userId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }
    const result = await deleteLawyer(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default lawyerRouter;
