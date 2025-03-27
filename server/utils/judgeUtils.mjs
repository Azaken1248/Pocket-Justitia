import Judge from "../DB/schemas/Judge.mjs";
import User from "../DB/schemas/User.mjs";

const updateJudge = async (userId, updateData) => {
  const judge = await Judge.findOne({ userId });
  if (!judge) throw new Error('Judge not found');

  Object.assign(judge, updateData);
  await judge.save();
  return { message: 'Judge updated successfully', judge };
};

const deleteJudge = async (userId) => {
  const judge = await Judge.findOne({ userId });
  if (!judge) throw new Error('Judge not found');

  await Judge.deleteOne({ userId });
  await User.deleteOne({ _id: userId });
  return { message: 'Judge and associated user deleted successfully' };
};

const getJudgeById = async (userId) => {
  const judge = await Judge.findOne({ userId });
  if (!judge) throw new Error('Judge not found');

  return judge;
};

const listJudges = async () => {
  const judges = await Judge.find({})

  return judges;
};

export { updateJudge, deleteJudge, getJudgeById, listJudges };