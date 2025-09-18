import PDFDocument from "pdfkit";
import ProctoringReport from "../models/ReportSchema.js";

export const generateReportPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ProctoringReport.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const doc = new PDFDocument({ margin: 50, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=report_${report._id}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(26)
      .fillColor("#4F46E5") 
      .text("Proctored Interview Report", { align: "center" })
      .moveDown(1.5);


    doc
      .fillColor("#000")
      .fontSize(14)
      .text(`Candidate Name: `, { continued: true })
      .fillColor("#4F46E5")
      .text(`${report.candidateName}`)
      .moveDown(0.3);

    doc
      .fillColor("#000")
      .text(`Interview Duration: `, { continued: true })
      .fillColor("#10B981")
      .text(`${report.interviewDuration}`)
      .moveDown(0.3);

    doc
      .fillColor("#000")
      .text(`Focus Lost Count: `, { continued: true })
      .fillColor("#F59E0B") 
      .text(`${report.focusLostCount}`)
      .moveDown(0.3);

    doc
      .fillColor("#000")
      .text(`Final Integrity Score: `, { continued: true })
      .fillColor("#EF4444") 
      .text(`${report.finalIntegrityScore}`)
      .moveDown(0.5);

    doc
      .fillColor("#6B7280")
      .fontSize(12)
      .text(`Created At: ${new Date(report.createdAt).toLocaleString()}`)
      .moveDown(1);

    doc
      .fontSize(16)
      .fillColor("#4B5563")
      .text("Suspicious Events", { underline: true })
      .moveDown(0.5);

    report.suspiciousEvents.forEach((event, idx) => {
      doc
        .fillColor("#111827")
        .fontSize(14)
        .text(`Event ${idx + 1}`, { underline: true })
        .moveDown(0.2);

      doc
        .fontSize(12)
        .fillColor("#6B7280")
        .text(`Timestamp: ${event.timestamp}`)
        .moveDown(0.2);

      if (event.detections.length > 0) {
        event.detections.forEach((det, dIdx) => {
          doc
            .fillColor("#4F46E5")
            .text(`• ${det.class}`, { continued: true })
            .fillColor("#10B981")
            .text(` (${(det.score * 100).toFixed(1)}%)`);
        });
      } else {
        doc.fillColor("#EF4444").text("No detections");
      }

      doc.moveDown(0.5);
      doc
        .strokeColor("#E5E7EB")
        .lineWidth(0.5)
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .stroke()
        .moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report PDF" });
  }
};
