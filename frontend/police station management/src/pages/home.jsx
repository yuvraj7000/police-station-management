import React from 'react';
import { Link } from 'react-router-dom';
import sp from './sp.jpg';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${sp})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-4">eCopStation</h1>
        <p className="text-white text-lg mb-6">Welcome to the Police Station Management website</p>
        <div className="space-y-4">
          <Link to="/reports">
            <button className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              See Reports
            </button>
          </Link>
          <Link to="/createReport">
            <button className="m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create FIR
            </button>
          </Link>
          <Link to="/manageMember">
            <button className="m-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Manage Members
            </button>
          </Link>
          <Link to="/manageReports">
            <button className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Manage Reports
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;