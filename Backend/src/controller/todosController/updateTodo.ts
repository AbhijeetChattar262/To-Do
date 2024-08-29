import { Request, Response } from "express";
import Todo from "../../models/todoModel";
const updateTodo = async(req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.params;
  const { task } = req.body;
  const userId = req.user.id;

  try{
    // Find the todo item based on id and user_id_FK
    const todo = await Todo.findOne({ where: { id, user_id_FK: userId } });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    } 

    // Update the task
    const updatedTodo =  todo.update({ task });
    res.json(updatedTodo);
  } catch (err) {
    console.error('Database Error:', err); // Debug output
    res.status(500).json({ message: "Error updating task" });

  }
};


export default updateTodo;
