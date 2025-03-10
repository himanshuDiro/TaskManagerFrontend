import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children, title = 'Task Manager App' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            {children}
          </div>
        </main>
        
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} Task Manager App. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;