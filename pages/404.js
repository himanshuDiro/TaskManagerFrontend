import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

export default function Custom404() {
  return (
    <Layout title="404 - Page Not Found">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-yellow-500 mb-6">
          <FaExclamationTriangle className="h-24 w-24" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <Link href="/">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg inline-flex items-center">
            <FaArrowLeft className="mr-2" /> Go Back Home
          </a>
        </Link>
      </div>
    </Layout>
  );
}