import axios from "axios";
import { Todo } from "../../interface/Todo";
import Alert from "../../components/Alert/Alert";
import { TODO_API_URL } from "../../constants/API_URLS";

const deleteTask = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[],
  token: string | null
) => {
  try {
    await axios.delete(`${TODO_API_URL}/${id}`, {
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

const handleDeleteTask = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[]
) => {
  const token = localStorage.getItem("token");

  Alert({
    alertType: "deleteTask",
    onConfirm: () => deleteTask(id, setTodos, todos, token),
  });
};

export default handleDeleteTask;
