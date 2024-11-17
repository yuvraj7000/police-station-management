import express from 'express';
import { createReport, getAllReports, deleteReport,changeReportStatus, getReportById } from '../controllers/report.controller.js';

const router = express.Router();

router.post('/create', createReport);
router.get('/all', getAllReports);
router.post('/status', changeReportStatus);
router.post('/getReport', getReportById);
router.post('/delete', deleteReport);
export default router;