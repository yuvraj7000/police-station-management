import React, { useState } from 'react';
import pms from './pms.png';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 px-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold flex justify-center items-center">
        <Link to="/">
            <img src={pms} alt="PMS Logo" className="h-20 w-auto" />
          </Link>
          <span>eCopStation</span>
        </div>
        <div className="hidden md:flex space-x-4">
        <a href="/" className="text-white hover:text-gray-400">Home</a>
          <a href="/members" className="text-white hover:text-gray-400">Members</a>
          <a href="/reports" className="text-white hover:text-gray-400">Reports</a>
          
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <a href="/members" className="block text-white hover:text-gray-400">Members</a>
          <a href="/reports" className="block text-white hover:text-gray-400">Reports</a>
          <a href="/" className="block text-white hover:text-gray-400">Home</a>
        </div>
      )}
    </nav>
  );
};

export default Nav;