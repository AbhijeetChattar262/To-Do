import axios from "axios";
import { Todo } from "../../interface/Todo";
import Alert from "../../components/common/Alert/Alert";
import { TODO_API_URL } from "../../constants/API_URLS";
import { DELETE_TASK_ALERT } from "../../constants/ALERTS";
import { DELETE_TASK_ERROR, UNEXPECTED_ERROR } from "../../constants/CONSOLE_ERRORS";

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
        DELETE_TASK_ERROR,
        error.response?.data || error.message
      );
    } else {
      console.error({ UNEXPECTED_ERROR}, error);
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
    alertType: DELETE_TASK_ALERT,
    onConfirm: () => deleteTask(id, setTodos, todos, token),
  });
};

export default handleDeleteTask;
