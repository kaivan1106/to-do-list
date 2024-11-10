const db = require('../config/db');

// Get all tasks for the authenticated user
exports.getTasks = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session

  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.status(200).json(results);
  });
};

// Add a new task for the authenticated user
exports.addTask = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session
  const { title, description, due_date, priority, status } = req.body;

  // Check for all required fields
  if (!title || !description || !due_date || !priority || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO tasks (user_id, title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [userId, title, description, due_date, priority, status], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      return res.status(500).json({ error: 'Error adding task' });
    }
    res.status(201).json({ message: 'Task added successfully' });
  });
};


// Update an existing task
exports.updateTask = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session
  
  const { taskId, title, description, status, due_date, priority } = req.body;
  console.log('Request body:', req.body);

  // Validation of required fields
  if (!taskId || !title || !description || !status || !due_date || !priority) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if task exists and belongs to the user
  const query = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
  db.query(query, [taskId, userId], (err, result) => {
    if (err) {
      console.error('Error checking task existence:', err);
      return res.status(500).json({ error: 'Database error when checking task' });
    }
    if (result.length === 0) {
      // No task found or the user is not authorized
      return res.status(404).json({ error: 'Task not found or not authorized to update' });
    }

    // If task exists, update it
    const updateQuery = 'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ?, priority = ? WHERE id = ? AND user_id = ?';
    db.query(updateQuery, [title, description, status, due_date, priority, taskId, userId], (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Error updating task' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Task not found or not authorized to update' });
      }
      res.status(200).json({ message: 'Task updated successfully' });
    });
  });
};


// Delete a task
exports.deleteTask = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
  db.query(query, [taskId, userId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Error deleting task' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not authorized to delete' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
};

// Search tasks by title or description
exports.searchTasks = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session
  const { searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const query = 'SELECT * FROM tasks WHERE user_id = ? AND (title LIKE ? OR description LIKE ?)';
  db.query(query, [userId, `%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) {
      console.error('Error searching tasks:', err);
      return res.status(500).json({ error: 'Error searching tasks' });
    }
    res.status(200).json(results);
  });
};

// Filter tasks by status
exports.filterTasks = (req, res) => {
  const userId = req.userId; // Assuming userId is passed via token or session
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({ error: 'Status filter is required' });
  }

  const query = 'SELECT * FROM tasks WHERE user_id = ? AND status = ?';
  db.query(query, [userId, status], (err, results) => {
    if (err) {
      console.error('Error filtering tasks:', err);
      return res.status(500).json({ error: 'Error filtering tasks' });
    }
    res.status(200).json(results);
  });
};
