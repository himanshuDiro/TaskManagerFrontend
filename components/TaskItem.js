import React, { useState } from 'react';
import { FaEdit, FaTrash, FaClock, FaCalendarAlt } from 'react-icons/fa';
import TaskForm from './TaskForm';
import { deleteTask } from '../utils/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Status badge color configurations
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Completed': 'bg-green-100 text-green-800 border-green-200'
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedTask) => {
    setIsEditing(false);
    onTaskUpdated(updatedTask);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        await deleteTask(task._id);
        onTaskDeleted(task._id);
      } catch (error) {
        alert('Failed to delete task');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isEditing) {
    return (
      <TaskForm 
        existingTask={task} 
        onSuccess={handleUpdate} 
        onCancel={() => setIsEditing(false)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          
          {task.description && (
            <p className="mt-2 text-gray-600">{task.description}</p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
            
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>Updated: {formatDate(task.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {task.status}
          </span>
          
          <div className="flex gap-2 mt-2">
            <button 
              onClick={handleEdit} 
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
              title="Edit task"
            >
              <FaEdit />
            </button>
            <button 
              onClick={handleDelete} 
              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
              title="Delete task"
              disabled={loading}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;