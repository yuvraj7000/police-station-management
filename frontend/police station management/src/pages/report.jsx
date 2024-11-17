import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  const truncateDetails = (details, wordLimit) => {
    const words = details.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return details;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Reports</h1>
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
            <Link to={`/rep/${report._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Report Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;