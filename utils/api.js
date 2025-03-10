import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Task API functions
export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/tasks`);
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchTask = async (taskId) => {
  try {
    const { data } = await axios.get(`${API_URL}/tasks/${taskId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const { data } = await axios.post(`${API_URL}/tasks`, taskData);
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const { data } = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
    return data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const { data } = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return data;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};