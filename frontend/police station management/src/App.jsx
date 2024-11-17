import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Nav from './components/nav';
import Footer from './components/footer';
import Members from './pages/member';
import Reports from './pages/report';
import CreateReport from './pages/createReport';
import Rep from './pages/repo';
import ManageMembers from './pages/manageMembers';
import ManageReports from './pages/manageReport';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'ecop') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password');
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

  return (
    <Router>
      <Nav />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/members" element={<Members />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/createReport" element={<CreateReport />} />
          <Route path="/rep/:id" element={<Rep />} />
          <Route path="/manageMember" element={<ManageMembers />} />
          <Route path="/manageReports" element={<ManageReports />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;