'use client';
import '../app/globals.css';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Contact from '../components/contact';

const Footer: React.FC = () => {
  return (
      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Liens légaux</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-green-400">Mentions légales</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">Conditions d’utilisation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">Politique de confidentialité</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="grid grid-cols-4 gap-4 justify-center items-center">
                <a href="#" className="hover:text-blue-500 inline-block text-center">
                  <FaFacebookF className="h-6 w-6 mb-2 mx-auto"/>
                </a>
                <a href="#" className="hover:text-blue-400 inline-block text-center">
                  <FaTwitter className="h-6 w-6 mb-2 mx-auto"/>
                </a>
                <a href="#" className="hover:text-pink-500 inline-block text-center">
                  <FaInstagram className="h-6 w-6 mb-2 mx-auto"/>
                </a>
                <a href="#" className="hover:text-blue-700 inline-block text-center">
                  <FaLinkedinIn className="h-6 w-6 mb-2 mx-auto"/>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact & FAQ</h3>
              <Contact />
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
