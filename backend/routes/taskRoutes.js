const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all tasks for the authenticated user
router.get('/tasks', authMiddleware, taskController.getTasks);

// Add a new task for the authenticated user
router.post('/tasks', authMiddleware, taskController.addTask);

// Update an existing task
router.put('/tasks', authMiddleware, taskController.updateTask);

// Delete a task
router.delete('/tasks', authMiddleware, taskController.deleteTask);

// Search tasks by title or description
router.get('/tasks/search', authMiddleware, taskController.searchTasks);

// Filter tasks by status
router.get('/tasks/filter', authMiddleware, taskController.filterTasks);

module.exports = router;
