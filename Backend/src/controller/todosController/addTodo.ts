import { Request, Response } from 'express';
import Todo from '../../models/todoModel'; // Adjust path as needed

const addTodo = async (req: Request, res: Response) => {
  if (!req.user) {
    console.error('Unauthorized access attempt'); // Debug output
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { task } = req.body;
  const userId = req.user.id;

  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  try {
    // Create a new Todo entry using Sequelize
    const newTodo = await Todo.create({
      user_id_FK: userId,
      task,
      completed: false,
    });

    res.status(201).json({
      id: newTodo.id,
      task: newTodo.task,
      completed: newTodo.completed,
    });
  } catch (err) {
    console.error('Database Error:', err); // Debug output
    res.status(500).json({ message: 'Error adding task' });
  }
};

export default addTodo;
