import { Request, Response } from 'express';
import Todo from '../../models/todoModel'; // Adjust path as needed

const getTodos = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  const userId = req.user.id;

  try {
    // Fetch todos for the user
    const todos = await Todo.findAll({
      where: {
        user_id_FK: userId,
      },
    });

    res.json(todos);
  } catch (err) {
    console.error('Database Error:', err); // Debug output
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export default getTodos;
