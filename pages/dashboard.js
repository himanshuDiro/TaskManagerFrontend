import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../utils/api';
import { FaPlus, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    // Load tasks
    if (isAuthenticated) {
      const loadTasks = async () => {
        try {
          setLoading(true);
          const data = await fetchTasks();
          setTasks(data);
          setError(null);
        } catch (err) {
          console.error('Error loading tasks:', err);
          setError('Failed to load tasks. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      loadTasks();
    }
  }, [isAuthenticated]);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  if (authLoading) {
    return (
      <Layout title="Dashboard - Loading">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout title="Dashboard - Task Manager">
      <div className="mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.username || 'User'}! Manage your tasks here.
              </p>
            </div>
            <button 
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {showTaskForm ? (
                <>
                  <FaTimes className="mr-2" /> Cancel
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" /> Add New Task
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {showTaskForm && (
          <TaskForm 
            onSuccess={handleTaskCreated} 
            onCancel={() => setShowTaskForm(false)}
          />
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6">
              <LoadingSpinner />
            </div>
          ) : (
            <TaskList />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;