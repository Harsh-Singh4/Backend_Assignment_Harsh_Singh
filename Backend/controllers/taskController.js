const Task = require('../models/task');

// ✅ CREATE TASK
const createTask = async (req, res) => {
    try {
        const data = req.body;

        const newTask = new Task({
            ...data,
            userId: req.user.id
        });

        const response = await newTask.save();

        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ GET ALL TASKS
const getAllTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'admin') {
            tasks = await Task.find();
        } else {
            tasks = await Task.find({ userId: req.user.id });
        }

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ GET TASK BY ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed' });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(updatedTask);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// ✅ DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed' });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({ message: 'Task deleted' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};