import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Nav from './components/nav';
import Footer from './components/footer';
import Members from './pages/member';
import Reports from './pages/report';
import CreateReport from './pages/createReport';

import './App.css';

function App() {
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;