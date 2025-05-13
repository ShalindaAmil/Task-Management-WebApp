
import Task from '../models/Task.js';

export async function getTasks(req, res) {
  try {
    const { status } = req.query;
    const filter = { createdBy: req.user._id };

    if (status) filter.status = status;

    const tasks = await find(filter).sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTask(req, res) {
  try {
    const task = await findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createTask(req, res) {
  try {
    const { title, description, deadline, assignedTo, status } = req.body;

    const task = new Task({
      title,
      description,
      deadline,
      assignedTo,
      status: status || 'Pending',
      createdBy: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const task = await findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}