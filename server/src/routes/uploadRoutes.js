import express from "express";
import { createReport, getReportById, getReports } from "../controllers/UploadLogs.js";
import { generateReportPdf } from "../controllers/generateReportPdf.js";

const router = express.Router();

router.post("/logs", createReport);  
router.get("/logs", getReports);     
router.get("/logs/:id", getReportById); 
router.get("/logs/:id/pdf", generateReportPdf);

export default router;
