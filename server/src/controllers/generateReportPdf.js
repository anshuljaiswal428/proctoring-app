import PDFDocument from "pdfkit";
import ProctoringReport from "../models/ReportSchema.js";

export const generateReportPdf = async (req, res) => {
  try {
    const { id } = req.params; 
    const report = await ProctoringReport.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=report_${report._id}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text("Proctored Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Candidate Name: ${report.candidateName}`);
    doc.text(`Interview Duration: ${report.interviewDuration}`);
    doc.text(`Focus Lost Count: ${report.focusLostCount}`);
    doc.text(`Final Integrity Score: ${report.finalIntegrityScore}`);
    doc.text(`Created At: ${new Date(report.createdAt).toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(16).text("Suspicious Events:", { underline: true });
    doc.moveDown(0.5);

    report.suspiciousEvents.forEach((event, idx) => {
      doc.fontSize(14).text(`Event ${idx + 1}:`);
      doc.fontSize(12).text(`Timestamp: ${event.timestamp}`);

      event.detections.forEach((det, dIdx) => {
        doc.text(
          `   Detection ${dIdx + 1}: ${det.class} (score: ${det.score.toFixed(2)})`
        );
      });

      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report PDF" });
  }
};
