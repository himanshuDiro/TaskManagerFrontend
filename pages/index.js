import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaCheckCircle, FaUserCog } from 'react-icons/fa';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  return (
    <Layout title="Task Manager - Home">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Manage Your Tasks with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A simple, effective way to organize your work and boost productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <a className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition shadow-md">
                  Get Started
                </a>
              </Link>
              <Link href="/login">
                <a className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition shadow-md">
                  Log In
                </a>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-center mb-4">
                  <FaTasks className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Task Organization
                </h3>
                <p className="text-gray-600 text-center">
                  Create, update, and organize tasks with a clean and intuitive interface.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-500 text-center mb-4">
                  <FaCheckCircle className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Status Tracking
                </h3>
                <p className="text-gray-600 text-center">
                  Track progress with status options: Pending, In Progress, and Completed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-500 text-center mb-4">
                  <FaUserCog className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  User Accounts
                </h3>
                <p className="text-gray-600 text-center">
                  Secure user authentication to keep your tasks private and organized.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="py-12 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              How It Works
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Create an account</h3>
                    <p className="text-gray-600 mt-1">
                      Sign up with your email and password to get started.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Add your tasks</h3>
                    <p className="text-gray-600 mt-1">
                      Create new tasks with titles, descriptions, and status.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Track your progress</h3>
                    <p className="text-gray-600 mt-1">
                      Update task status as you work on them and mark them as completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Organized?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join now and start managing your tasks effectively.
            </p>
            <Link href="/register">
              <a className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition shadow-md">
                Sign Up for Free
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}