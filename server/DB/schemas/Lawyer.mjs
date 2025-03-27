import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String },
    experienceYears: { type: Number },
    licenseNumber: { type: String, required: true },
    casesHandled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  
  const Lawyer = mongoose.model('Lawyer', lawyerSchema);
  export default Lawyer;