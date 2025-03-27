import express from 'express';
import mongoose from 'mongoose';
import {
  createCase,
  getCaseById,
  updateCase,
  deleteCase,
  addCourtProgress,
  getCaseProgress,
  listCases,
  getCasesByUserId,
  getCasesByStatus,
  updateCaseStatus,
  reassignLawyerOrJudge
} from '../utils/caseUtils.mjs';

const caseRouter = express.Router();

caseRouter.post('/', async (req, res) => {
  try {
    const result = await createCase(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

caseRouter.get('/:caseId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.caseId)) {
      return res.status(400).json({ error: 'Invalid Case ID format' });
    }
    const result = await getCaseById(req.params.caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

caseRouter.put('/:caseId', async (req, res) => {
  try {
    const result = await updateCase(req.params.caseId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

caseRouter.delete('/:caseId', async (req, res) => {
  try {
    const result = await deleteCase(req.params.caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

caseRouter.post('/:caseId/progress', async (req, res) => {
  try {
    const result = await addCourtProgress(req.params.caseId, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

caseRouter.get('/:caseId/progress', async (req, res) => {
  try {
    const result = await getCaseProgress(req.params.caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

caseRouter.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await listCases(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

caseRouter.get('/user/:userId', async (req, res) => {
  try {
    const result = await getCasesByUserId(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

caseRouter.get('/status/:status', async (req, res) => {
  try {
    const result = await getCasesByStatus(req.params.status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

caseRouter.put('/:caseId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await updateCaseStatus(req.params.caseId, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

caseRouter.put('/:caseId/reassign', async (req, res) => {
  try {
    const { newLawyerId, newJudgeId } = req.body;
    const result = await reassignLawyerOrJudge(req.params.caseId, newLawyerId, newJudgeId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default caseRouter;
