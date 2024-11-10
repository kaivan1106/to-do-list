import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

function TaskList({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/tasks/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://localhost:5000/tasks/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { taskId },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskSubmit = async (taskData) => {
    const token = localStorage.getItem('token');
    try {
      if (taskToEdit) {
        // Update task
        const updatedTaskData = { ...taskData, taskId: taskToEdit.id }; // Make sure taskId is passed
        await axios.put('http://localhost:5000/tasks/tasks', updatedTaskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Update the task in the state directly to reflect the change without re-fetching
        setTasks(tasks.map((task) => (task.id === taskToEdit.id ? { ...task, ...taskData } : task)));
      } else {
        // Add new task
        await axios.post('http://localhost:5000/tasks/tasks', taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Add the new task to the tasks list in the state
        setTasks([...tasks, taskData]);
      }
      setTaskToEdit(null);  // Reset after submitting
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };  

  // TaskList.js

return (
  <div className="task-list">
    <button onClick={onLogout} className="logout-button">Logout</button>
    <h2>Your Tasks</h2>
    <TaskForm task={taskToEdit} onSubmit={handleTaskSubmit} onCancel={() => setTaskToEdit(null)} />
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.due_date}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>
              <button onClick={() => handleEdit(task)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default TaskList;
