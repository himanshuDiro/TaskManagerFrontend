import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link href="/">
                <a className="flex items-center py-5 px-2 text-white hover:text-gray-300">
                  <FaTasks className="h-6 w-6 mr-1 text-blue-400" />
                  <span className="font-bold">Task Manager</span>
                </a>
              </Link>
            </div>

            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {isAuthenticated && (
                <Link href="/dashboard">
                  <a className={`py-5 px-3 hover:text-gray-300 ${
                    router.pathname === '/dashboard' ? 'text-blue-400' : ''
                  }`}>
                    Dashboard
                  </a>
                </Link>
              )}
            </div>
          </div>

          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <div className="py-5 px-3">
                  <span className="mr-1">Welcome,</span>
                  <span className="font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className={`py-5 px-3 hover:text-gray-300 ${
                    router.pathname === '/login' ? 'text-blue-400' : ''
                  }`}>
                    Login
                  </a>
                </Link>
                <Link href="/register">
                  <a className={`py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 ${
                    router.pathname === '/register' ? 'bg-blue-600' : ''
                  }`}>
                    Register
                  </a>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleMenu}>
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">
              <a className={`block py-2 px-4 text-sm hover:bg-gray-700 ${
                router.pathname === '/dashboard' ? 'bg-gray-700' : ''
              }`}>
                Dashboard
              </a>
            </Link>
            <div className="py-2 px-4 text-sm">
              <span className="mr-1">Welcome,</span>
              <span className="font-medium">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              className="block w-full text-left py-2 px-4 text-sm hover:bg-red-600 bg-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <a className={`block py-2 px-4 text-sm hover:bg-gray-700 ${
                router.pathname === '/login' ? 'bg-gray-700' : ''
              }`}>
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className={`block py-2 px-4 text-sm hover:bg-blue-600 bg-blue-500 ${
                router.pathname === '/register' ? 'bg-blue-600' : ''
              }`}>
                Register
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;