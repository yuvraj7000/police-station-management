import React, { useState } from 'react';
import axios from 'axios';

const Rep = () => {
  const [reportId, setReportId] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setReportId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/report/getReport', { id: reportId });
      setReport(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Get Report</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportId">
            Report ID
          </label>
          <input
            type="text"
            id="reportId"
            name="reportId"
            value={reportId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Report
          </button>
        </div>
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
      {report && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{report.title}</h2>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Reported By:</span> {report.reportBy}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Details:</span> {report.details}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Address:</span> {report.address}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Mobile No:</span> {report.mobileNo}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Recorded By:</span> {report.recordedBy}</p>
          <p className="text-gray-600 mb-2"><span className="font-semibold">Date:</span> {new Date(report.date).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-4"><span className="font-semibold">Status:</span> {report.status}</p>
        </div>
      )}
    </div>
  );
};

export default Rep;