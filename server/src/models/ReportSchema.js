import mongoose from "mongoose";

const suspiciousEventSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  detections: [
    {
      bbox: { type: [Number], required: false }, 
      class: { type: String, required: true },   
      score: { type: Number, required: true }    
    }
  ]
});

const proctoringReportSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  interviewDuration: { type: String, required: true },
  focusLostCount: { type: Number, default: 0 },
  suspiciousEvents: [suspiciousEventSchema], 
  finalIntegrityScore: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ProctoringReport", proctoringReportSchema);
