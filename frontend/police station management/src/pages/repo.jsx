import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Rep = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.post('http://localhost:5000/report/getReport', { id });
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
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