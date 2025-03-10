import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import LoadingSpinner from './LoadingSpinner';
import { fetchTasks } from '../utils/api';
import { FaTasks, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((task) => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  // Sort tasks function
  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
        // For dates
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        
        if (sortConfig.direction === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else {
        // For strings
        if (!a[sortConfig.key]) return 1;
        if (!b[sortConfig.key]) return -1;
        
        const valueA = a[sortConfig.key].toUpperCase();
        const valueB = b[sortConfig.key].toUpperCase();
        
        if (valueA < valueB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
  };

  // Request a sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter((task) => {
    // First apply status filter
    const statusMatch = filter === 'all' || task.status === filter;
    
    // Then apply search filter
    const searchMatch = !searchTerm || 
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && searchMatch;
  });

  // Apply sorting to filtered tasks
  const sortedTasks = sortTasks(filteredTasks);

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'Pending').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total</h3>
          <p className="text-3xl font-bold text-blue-600">{taskStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{taskStats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-blue-700">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">{taskStats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-green-700">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaTasks className="mr-2 text-blue-500" /> 
            My Tasks
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white 
                          placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter dropdown */}
            <div className="flex items-center w-full sm:w-auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFilter className="w-4 h-4 text-gray-500" />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="all">All Tasks</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sort options */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => requestSort('title')}
            className={`flex items-center px-3 py-1 rounded text-sm ${
              sortConfig.key === 'title' 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Title
            {sortConfig.key === 'title' && (
              sortConfig.direction === 'asc' 
                ? <FaSortAmountUp className="ml-1" /> 
                : <FaSortAmountDown className="ml-1" />
            )}
          </button>
          <button 
            onClick={() => requestSort('status')}
            className={`flex items-center px-3 py-1 rounded text-sm ${
              sortConfig.key === 'status' 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Status
            {sortConfig.key === 'status' && (
              sortConfig.direction === 'asc' 
                ? <FaSortAmountUp className="ml-1" /> 
                : <FaSortAmountDown className="ml-1" />
            )}
          </button>
          <button 
            onClick={() => requestSort('createdAt')}
            className={`flex items-center px-3 py-1 rounded text-sm ${
              sortConfig.key === 'createdAt' 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Created Date
            {sortConfig.key === 'createdAt' && (
              sortConfig.direction === 'asc' 
                ? <FaSortAmountUp className="ml-1" /> 
                : <FaSortAmountDown className="ml-1" />
            )}
          </button>
          <button 
            onClick={() => requestSort('updatedAt')}
            className={`flex items-center px-3 py-1 rounded text-sm ${
              sortConfig.key === 'updatedAt' 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Updated Date
            {sortConfig.key === 'updatedAt' && (
              sortConfig.direction === 'asc' 
                ? <FaSortAmountUp className="ml-1" /> 
                : <FaSortAmountDown className="ml-1" />
            )}
          </button>
        </div>

        {sortedTasks.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              {searchTerm || filter !== 'all' 
                ? 'No tasks match your filters. Try adjusting your search or filter criteria.'
                : 'You have no tasks yet. Create a new task to get started!'}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-sm text-gray-600">
              Showing {sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'}
            </div>
            
            <div className="space-y-4">
              {sortedTasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;