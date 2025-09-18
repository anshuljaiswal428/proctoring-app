import ProctoringReport from "../models/ReportSchema.js"

export const createReport = async (req, res) => {
  try {
    const {
      candidateName,
      interviewDuration,
      focusLostCount,
      suspiciousEvents,
      finalIntegrityScore,
    } = req.body;

    if (!candidateName || !interviewDuration || !finalIntegrityScore) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new ProctoringReport({
      candidateName,
      interviewDuration,
      focusLostCount,
      suspiciousEvents,
      finalIntegrityScore,
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await ProctoringReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await ProctoringReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
