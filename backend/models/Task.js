const db = require('../config/db');

const Task = {
  create: (userId, title, description, dueDate, priority, callback) => {
    const query = 'INSERT INTO tasks (user_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [userId, title, description, dueDate, priority], callback);
  },
  findAllByUser: (userId, callback) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    db.query(query, [userId], callback);
  },
  updateById: (taskId, userId, updates, callback) => {
    const query = 'UPDATE tasks SET ? WHERE id = ? AND user_id = ?';
    db.query(query, [updates, taskId, userId], callback);
  },
  deleteById: (taskId, userId, callback) => {
    const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
    db.query(query, [taskId, userId], callback);
  }
};

module.exports = Task;
