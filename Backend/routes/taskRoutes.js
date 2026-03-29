const express = require('express');
const router = express.Router();

const { jwtAuthMiddleware } = require('../middleware/jwt');

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// ✅ ROUTES
router.post('/', jwtAuthMiddleware, createTask);
router.get('/', jwtAuthMiddleware, getAllTasks);
router.get('/:id', jwtAuthMiddleware, getTaskById);
router.put('/:id', jwtAuthMiddleware, updateTask);
router.delete('/:id', jwtAuthMiddleware, deleteTask);

module.exports = router;