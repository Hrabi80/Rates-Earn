'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Enterprise Platform. All Rights Reserved.
        </p>
        <div className="space-x-4 mt-2">
          <a href="#" className="hover:text-green-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
