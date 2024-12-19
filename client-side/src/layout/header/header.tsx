'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/ui/Button';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <span className="text-green-500">Enterprise</span> Platform
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link href="/" className="text-gray-600 hover:text-green-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-green-500">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-500">
            Contact
          </Link>
        </nav>

        {/* Call to Action */}
        <Button >
          <Link href="/register">Get Started</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
