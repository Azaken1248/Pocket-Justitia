import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Ongoing', 'Closed'], default: 'Pending' },
    filedDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    normalUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    againstUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lawyer' },
    judgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Judge' },
    progressTimeline: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourtProgress' }]
  });
  
  const Case = mongoose.model('Case', caseSchema);
  export default Case;