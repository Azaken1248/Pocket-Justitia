import express from 'express';
import { generateCaseSummary } from '../utils/geminiUtils.mjs';

const router = express.Router();

router.post('/generate-summary', async (req, res) => {
  const { caseDescription } = req.body;

  if (!caseDescription) {
    return res.status(400).json({ error: 'Case description is required' });
  }

  try {
    const summary = await generateCaseSummary(caseDescription);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
