import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    status: 'pending',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date || '',
        priority: task.priority || 'low',
        status: task.status || 'pending',
      });
    }
  }, [task]);  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      due_date: '',
      priority: 'low',
      status: 'pending',
    });
  };

  return (
    // TaskForm.js

<form onSubmit={handleSubmit} className="task-form">
  <input
    type="text"
    name="title"
    placeholder="Task Title"
    value={formData.title}
    onChange={handleChange}
    required
  />
  <textarea
    name="description"
    placeholder="Task Description"
    value={formData.description}
    onChange={handleChange}
    required
  />
  <input
    type="date"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
  />
  <select name="priority" value={formData.priority} onChange={handleChange}>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
  <select name="status" value={formData.status} onChange={handleChange}>
    <option value="pending">Pending</option>
    <option value="completed">Completed</option>
  </select>
  <button type="submit" className="submit-button">{task ? 'Update Task' : 'Add Task'}</button>
  {task && <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>}
</form>

  );
}

export default TaskForm;
