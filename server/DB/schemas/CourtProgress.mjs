const courtProgressSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    status: { type: String, enum: ['Filed', 'In Hearing', 'Evidence Submission', 'Judgement'] },
    date: { type: Date, default: Date.now },
    remarks: { type: String }
  });
  
  const CourtProgress = mongoose.model('CourtProgress', courtProgressSchema);
  export default CourtProgress;