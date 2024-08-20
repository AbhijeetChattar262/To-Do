import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleDeleteTask = async (
  id: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[]
) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:5000/todos/${id}`, {
    headers: {
      Authorization: token || "",
    },
  });
  setTodos(todos.filter((todo) => todo.id !== id));
};

export default handleDeleteTask;
