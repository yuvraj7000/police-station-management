import Report from '../models/report.model.js';
import User from '../models/user.model.js';

const createReport = async (req, res) => {
  const { title, reportBy, details, address, mobileNo, recordedBy, password } = req.body;

  if (!title || !reportBy || !details || !address || !mobileNo || !recordedBy || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Verify recordedBy (username) and password
    const user = await User.findOne({ username: recordedBy });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create the report
    const report = new Report({
      title,
      reportBy,
      details,
      address,
      mobileNo,
      recordedBy,
      date: new Date(),
      status: "pending"
    });

    await report.save();
    return res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getAllReports = async (req, res) => {
    try {
      const reports = await Report.find({});
      return res.status(200).json(reports);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };

  const changeReportStatus = async (req, res) => {
    const { reportId, status } = req.body;
  
    if (!reportId || !status) {
      return res.status(400).json({ message: 'Report ID and status are required' });
    }
  
    try {
      const report = await Report.findById(reportId);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      report.status = status;
      await report.save();
  
      return res.status(200).json({ message: 'Report status updated successfully', report });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };

  const getReportById = async (req, res) => {
    const { id } = req.body;
  
    try {
      const report = await Report.findById(id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      return res.status(200).json(report);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };

  const deleteReport = async (req, res) => {

    const { id } = req.body;
  console.log(id);
    try {
      const report = await Report.findByIdAndDelete(id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      return res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export { createReport, getAllReports, changeReportStatus, deleteReport, getReportById };