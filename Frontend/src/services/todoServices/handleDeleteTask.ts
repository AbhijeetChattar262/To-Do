import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleDeleteTask = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[]
) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting task:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default handleDeleteTask;