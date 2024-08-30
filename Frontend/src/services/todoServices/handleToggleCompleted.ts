import axios from "axios";
import { Todo } from "../../interface/Todo";
import { TOGGLE_TODO_API_URL } from "../../constants/API_URLS";

const handleToggleCompleted = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[]
) => {
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
};

export default handleToggleCompleted;
