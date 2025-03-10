import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaBug, FaArrowLeft } from 'react-icons/fa';

export default function Custom500() {
  return (
    <Layout title="500 - Server Error">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-6">
          <FaBug className="h-24 w-24" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Server Error
        </h2>
        
        <p className="text-gray-600 mb-8 text-center max-w-md">
          We're sorry, something went wrong on our server. 
          Our team has been notified and we're working to fix the issue.
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