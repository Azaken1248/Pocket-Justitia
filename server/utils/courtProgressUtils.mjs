import CourtProgress from '../DB/schemas/CourtProgress.mjs';
import Case from '../DB/schemas/Case.mjs';

const createCourtProgress = async (progressData) => {
  const { caseId } = progressData;

  const existingCase = await Case.findById(caseId);
  if (!existingCase) throw new Error('Case not found');

  const newProgress = new CourtProgress(progressData);
  await newProgress.save();
  existingCase.progressTimeline.push(newProgress._id);
  await existingCase.save();

  return { message: 'Court progress added', progress: newProgress };
};

const getCourtProgressById = async (progressId) => {
  const progress = await CourtProgress.findById(progressId).populate('caseId');
  if (!progress) throw new Error('Court progress not found');
  return progress;
};

const getProgressByCaseId = async (caseId) => {
  const progressList = await CourtProgress.find({ caseId });
  if (!progressList.length) throw new Error('No progress found for this case');
  return progressList;
};

const updateCourtProgress = async (progressId, updateData) => {
  const updatedProgress = await CourtProgress.findByIdAndUpdate(progressId, updateData, { new: true });
  if (!updatedProgress) throw new Error('Court progress not found');
  return { message: 'Court progress updated', progress: updatedProgress };
};

const deleteCourtProgress = async (progressId) => {
  const deletedProgress = await CourtProgress.findByIdAndDelete(progressId);
  if (!deletedProgress) throw new Error('Court progress not found');

  await Case.findByIdAndUpdate(deletedProgress.caseId, {
    $pull: { progressTimeline: progressId },
  });

  return { message: 'Court progress deleted successfully' };
};

const listCourtProgress = async (page = 1, limit = 10) => {
  const progress = await CourtProgress.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('caseId');
  return progress;
};

export {
  createCourtProgress,
  getCourtProgressById,
  getProgressByCaseId,
  updateCourtProgress,
  deleteCourtProgress,
  listCourtProgress
};
