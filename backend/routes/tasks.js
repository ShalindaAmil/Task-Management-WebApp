
import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.js';
import isAuthenticated from '../middlewares/auth.js';

const router = Router();

router.post('/', isAuthenticated, createTask);
router.get('/', isAuthenticated, getTasks);
router.get('/:id', isAuthenticated, getTask);
router.put('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);

export default router;