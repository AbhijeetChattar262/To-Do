import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleToggleCompleted = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[]
) => {
  const token = localStorage.getItem("token");
  await axios.put(
    `http://localhost:5000/todos/toggle/${id}`,
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
