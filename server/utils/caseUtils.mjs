import Case from '../DB/schemas/Case.mjs';
import CourtProgress from '../DB/schemas/CourtProgress.mjs';

const createCase = async (caseData) => {
  const newCase = new Case(caseData);
  await newCase.save();
  return { message: 'Case created successfully', case: newCase };
};

const getCaseById = async (caseId) => {
  const caseData = await Case.findById(caseId).populate('lawyerId judgeId normalUserId againstUserId progressTimeline');
  if (!caseData) throw new Error('Case not found');
  return caseData;
};

const updateCase = async (caseId, updateData) => {
  const updatedCase = await Case.findByIdAndUpdate(caseId, updateData, { new: true });
  if (!updatedCase) throw new Error('Case not found');
  return { message: 'Case updated successfully', updatedCase };
};

const deleteCase = async (caseId) => {
  const deletedCase = await Case.findByIdAndDelete(caseId);
  if (!deletedCase) throw new Error('Case not found');
  return { message: 'Case deleted successfully' };
};

const addCourtProgress = async (caseId, progressData) => {
  const newProgress = new CourtProgress({ caseId, ...progressData });
  await newProgress.save();
  await Case.findByIdAndUpdate(caseId, { $push: { progressTimeline: newProgress._id } });
  return { message: 'Progress added successfully', progress: newProgress };
};

const getCaseProgress = async (caseId) => {
  const progress = await CourtProgress.find({ caseId });
  if (!progress.length) throw new Error('No progress found for this case');
  return progress;
};

const listCases = async (page = 1, limit = 10) => {
  const cases = await Case.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('lawyerId judgeId normalUserId againstUserId progressTimeline');

  return cases;
};

const getCasesByUserId = async (userId) => {
  const cases = await Case.find({
    $or: [
      { normalUserId: userId },
      { againstUserId: userId },
      { lawyerId: userId },
      { judgeId: userId }
    ]
  });
  return cases;
};

const getCasesByStatus = async (status) => {
  const cases = await Case.find({ status });
  return cases;
};

const updateCaseStatus = async (caseId, status) => {
  const validStatuses = ['Pending', 'Ongoing', 'Closed'];
  if (!validStatuses.includes(status)) throw new Error('Invalid status');

  const updatedCase = await Case.findByIdAndUpdate(caseId, { status, lastUpdated: Date.now() }, { new: true });
  if (!updatedCase) throw new Error('Case not found');

  return { message: 'Case status updated', updatedCase };
};

const reassignLawyerOrJudge = async (caseId, newLawyerId, newJudgeId) => {
  const caseToUpdate = await Case.findById(caseId);
  if (!caseToUpdate) throw new Error('Case not found');

  if (newLawyerId) caseToUpdate.lawyerId = newLawyerId;
  if (newJudgeId) caseToUpdate.judgeId = newJudgeId;

  await caseToUpdate.save();
  return { message: 'Lawyer or Judge reassigned successfully', case: caseToUpdate };
};

export {
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
};
