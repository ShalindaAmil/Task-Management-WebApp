
const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/', isAuthenticated, createTask);
router.get('/', isAuthenticated, getTasks);
router.get('/:id', isAuthenticated, getTask);
router.put('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);

module.exports = router;