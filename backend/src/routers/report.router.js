import express from 'express';
import { createReport, getAllReports,  changeReportStatus, getReportById } from '../controllers/report.controller.js';

const router = express.Router();

router.post('/create', createReport);
router.get('/all', getAllReports);
router.post('/status', changeReportStatus);
router.post('/getReport', getReportById);

export default router;