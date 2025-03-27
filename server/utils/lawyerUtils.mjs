import Lawyer from "../DB/schemas/Lawyer.mjs";
import User from "../DB/schemas/User.mjs";

const updateLawyer = async (userId, updateData) => {
  const lawyer = await Lawyer.findOne({ userId });
  if (!lawyer) throw new Error('Lawyer not found');

  Object.assign(lawyer, updateData);
  await lawyer.save();
  return { message: 'Lawyer updated successfully', lawyer };
};

const deleteLawyer = async (userId) => {
  const lawyer = await Lawyer.findOne({ userId });
  if (!lawyer) throw new Error('Lawyer not found');

  await Lawyer.deleteOne({ userId });
  await User.deleteOne({ _id: userId });
  return { message: 'Lawyer and associated user deleted successfully' };
};

const getLawyerById = async (userId) => {
    const lawyer = await Lawyer.findOne({ userId })
      
  
    if (!lawyer) throw new Error('Lawyer not found');
    return lawyer;
  };
  
  const listLawyers = async () => {
    const lawyers = await Lawyer.find({})
  
    return lawyers;
  };
  

export { updateLawyer, deleteLawyer, getLawyerById, listLawyers };