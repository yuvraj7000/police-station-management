import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Police Station Management. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;