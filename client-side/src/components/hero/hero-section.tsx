'use client';

import React from 'react';
import { Button } from '@/ui/Button';
import '../../app/globals.css';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Empower Your Enterprise with <span className="text-yellow-300">Innovation</span>
        </h1>
        <p className="text-lg mb-8">
          Join thousands of businesses transforming their workflow with our platform.
        </p>
        <Button className="px-6 py-3 text-lg">
          <a href="/register">Get Started</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
