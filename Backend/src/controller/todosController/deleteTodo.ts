import { Request, Response } from 'express';
import Todo from '../../models/todoModel'; // Adjust path as needed

const deleteTodo = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Attempt to delete the todo entry
    const result = await Todo.destroy({
      where: {
        id,
        user_id_FK: userId,
      },
    });

    // Check if any rows were affected
    if (result === 0) {
      return res.status(404).json({ message: 'Task not found or not owned by user' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Database Error:', err); // Debug output
    res.status(500).json({ message: 'Error deleting task' });
  }
};

export default deleteTodo;
