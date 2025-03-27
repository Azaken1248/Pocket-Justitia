import express from 'express';
import {
  createCourtProgress,
  getCourtProgressById,
  getProgressByCaseId,
  updateCourtProgress,
  deleteCourtProgress,
  listCourtProgress
} from '../utils/courtProgressUtils.mjs';

const courtProgressRouter = express.Router();

courtProgressRouter.post('/', async (req, res) => {
  try {
    const result = await createCourtProgress(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

courtProgressRouter.get('/:progressId', async (req, res) => {
  try {
    const result = await getCourtProgressById(req.params.progressId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

courtProgressRouter.get('/case/:caseId', async (req, res) => {
  try {
    const result = await getProgressByCaseId(req.params.caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

courtProgressRouter.put('/:progressId', async (req, res) => {
  try {
    const result = await updateCourtProgress(req.params.progressId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

courtProgressRouter.delete('/:progressId', async (req, res) => {
  try {
    const result = await deleteCourtProgress(req.params.progressId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

courtProgressRouter.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await listCourtProgress(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default courtProgressRouter;
