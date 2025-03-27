const judgeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courtName: { type: String },
    yearsOfExperience: { type: Number },
    casesHandled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }]
  });
  
  const Judge = mongoose.model('Judge', judgeSchema);
  export default Judge;