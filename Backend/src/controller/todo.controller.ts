import { Request, Response } from "express";
import { MESSAGES } from "../constants/TODO/todoConstants";
import { TodoServices } from "../services/db-services/todo.service";

class TodoController {
  public static async addTodo(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });
    }

    const { task } = req.body;
    const userId = String(req.user.id); 

    if (!task) {
      return res.status(400).json({ message: MESSAGES.TASK_REQUIRED });
    }

    try {
      const newTodo = await TodoServices.addTodo(userId, task);
      res.status(201).json({
        id: newTodo.id,
        task: newTodo.task,
        completed: newTodo.completed,
      });
    } catch (err) {
      console.error(MESSAGES.ERROR_ADDING_TASK, err);
      res.status(500).json({ message: MESSAGES.ERROR_ADDING_TASK });
    }
  }

  public static async deleteTodo(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

    const { id } = req.params;
    const userId = String(req.user.id);  

    try {
      const isDeleted = await TodoServices.deleteTodo(id, userId);
      if (!isDeleted) {
        return res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
      }

      res.json({ message: MESSAGES.TASK_DELETED });
    } catch (err) {
      console.error(MESSAGES.ERROR_DELETING_TASK, err);
      res.status(500).json({ message: MESSAGES.ERROR_DELETING_TASK });
    }
  }

  public static async getTodos(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

    const userId = String(req.user.id); 

    try {
      const todos = await TodoServices.getTodos(userId);
      res.json(todos);
    } catch (err) {
      console.error(MESSAGES.ERROR_FETCHING_TASKS, err);
      res.status(500).json({ message: MESSAGES.ERROR_FETCHING_TASKS });
    }
  }

  public static async toggleComplete(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

    const { id } = req.params;
    const userId = String(req.user.id);  

    try {
      const updatedTodo = await TodoServices.toggleTodoCompletion(id, userId); 
      if (!updatedTodo) {
        return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
      }

      res.json(updatedTodo);
    } catch (err) {
      console.error(MESSAGES.ERROR_TOGGLING_TASK, err);
      res.status(500).json({ message: MESSAGES.ERROR_TOGGLING_TASK });
    }
  }

  public static async updateTodo(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: MESSAGES.UNAUTHORIZED });

    const { id } = req.params;
    const { task } = req.body;
    const userId = String(req.user.id);  

    try {
      const updatedTodo = await TodoServices.updateTodoTask(id, userId, task); 
      if (!updatedTodo) {
        return res.status(404).json({ message: MESSAGES.TODO_NOT_FOUND });
      }

      res.json(updatedTodo);
    } catch (err) {
      console.error(MESSAGES.ERROR_UPDATING_TASK, err);
      res.status(500).json({ message: MESSAGES.ERROR_UPDATING_TASK });
    }
  }
}

export default TodoController;
