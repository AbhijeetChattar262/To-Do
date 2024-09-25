// services/todoServices/TodoService.ts

import axios from "axios";
import {Todo}  from "../interface/Todo";
import Alert from "../components/common/Alert/Alert";
import { TODO_API_URL, TOGGLE_TODO_API_URL } from "../constants/API_URLS";
import {
  FETCH_TODOS_ERROR,
  FAILED_TO_ADD_TASK_ERROR,
  TASK_CANNOT_BE_EMPTY_ERROR,
  DELETE_TASK_ERROR,
  UNEXPECTED_ERROR,
} from "../constants/CONSOLE_ERRORS";
import {
  TASK_CANNOT_BE_EMPTY_ALERT,
  DELETE_TASK_ALERT,
} from "../constants/ALERTS";

// ======================================================== TodoService class started ========================================================
class TodoServices {
  private static instance: TodoServices;

  public static getInstance(): TodoServices {
    if (!TodoServices.instance) {
        TodoServices.instance = new TodoServices();
    }
    return TodoServices.instance;
  }

  // ======================================================== fetchTodos method started ========================================================

  public async fetchTodos(
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get<Todo[]>(TODO_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error({ FETCH_TODOS_ERROR }, error);
    }
  }
  // ========================================================= fetchTodos method ended =========================================================


  // ========================================================= handleAddTask method started =========================================================
  public async handleAddTask(
    newTask: string,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    setNewTask: React.Dispatch<React.SetStateAction<string>>
  ) {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      Alert({ alertType: TASK_CANNOT_BE_EMPTY_ALERT });
      console.error({ TASK_CANNOT_BE_EMPTY_ERROR });
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        TODO_API_URL,
        { task: trimmedTask },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos([...todos, response.data]);
      console.log("Task added successfully");
      setNewTask(""); // Clear the input after successful addition
    } catch (error) {
      console.error({ FAILED_TO_ADD_TASK_ERROR }, error);
    }
  }

  // =========================================================== handleAddTask method ended =============================================================

  // =========================================================== deleteTask method started ===========================================================

  public async deleteTask(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[],
    token: string | null
  ) {
    try {
      await axios.delete(`${TODO_API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(DELETE_TASK_ERROR, error.response?.data || error.message);
      } else {
        console.error({ UNEXPECTED_ERROR }, error);
      }
    }
  }

  // =========================================================== deleteTask method ended =============================================================

  // =========================================================== handleDeleteTask method started ============================================================
  public handleDeleteTask(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[]
  ) {
    const token = localStorage.getItem("token");

    Alert({
      alertType: DELETE_TASK_ALERT,
      onConfirm: () => this.deleteTask(id, setTodos, todos, token),
    });
  }

  public handleEditTask(
    todo: Todo,
    setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>,
    setNewTask: React.Dispatch<React.SetStateAction<string>>
  ) {
    setEditingTask(todo);
    setNewTask(todo.task);
  }

  // =========================================================== handleDeleteTask method ended ============================================================

  // =========================================================== handleToggleCompleted method started ===========================================================
  public async handleToggleCompleted(
    id: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[]
  ) {
    const token = localStorage.getItem("token");
    await axios.put(
      `${TOGGLE_TODO_API_URL}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // ========================================================== handleToggleCompleted method ended ===========================================================

  // =========================================================== handleUpdateTask method started ============================================================
  public async handleUpdateTask(
    editingTask: Todo | null,
    newTask: string,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    todos: Todo[],
    setNewTask: React.Dispatch<React.SetStateAction<string>>,
    setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>
  ) {
    if (!editingTask) return;

    const token = localStorage.getItem("token");
    await axios.put(
      `${TODO_API_URL}/${editingTask.id}`,
      { task: newTask },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos(
      todos.map((todo) =>
        todo.id === editingTask.id ? { ...todo, task: newTask } : todo
      )
    );
    setNewTask("");
    setEditingTask(null);
  }
}

// =============================================================== handleUpdateTask method ended ===========================================================



// =============================================================== TodoServices class ended ===========================================================



// =============================================================== Export the singleton instance of TodoService =================================================
export default TodoServices.getInstance();
