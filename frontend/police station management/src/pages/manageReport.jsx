import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageReports = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'ecop') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchReports = async () => {
        try {
          const response = await axios.get('http://localhost:5000/report/all');
          setReports(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      fetchReports();
    }
  }, [isAuthenticated]);

  const handleChangeStatus = async (reportId) => {
    try {
      const response = await axios.post('http://localhost:5000/report/status', {
        reportId,
        status
      });
      setReports(reports.map(report => report._id === reportId ? { ...report, status: response.data.report.status } : report));
      setStatus('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        const response = await axios.post('http://localhost:5000/report/delete', { id: reportId });
        setReports(reports.filter(report => report._id !== reportId));
        alert(response.data.message);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handlePasswordSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Enter Password</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <div key={report._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{report.title}</h2>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Reported By:</span> {report.reportBy}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Address:</span> {report.address}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Mobile No:</span> {report.mobileNo}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Recorded By:</span> {report.recordedBy}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Date:</span> {new Date(report.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Status:</span> {report.status}</p>
            <div className="flex flex-col">
              <Link to={`/rep/${report._id}`}>
                <button className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  View Report Details
                </button>
              </Link>
              <input
                type="text"
                placeholder="New Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow m-1 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                className="bg-green-500 m-1 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => handleChangeStatus(report._id)}
              >
                Change Status
              </button>
              <button
                className="bg-red-500 m-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => handleDeleteReport(report._id)}
              >
                Delete Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReports;