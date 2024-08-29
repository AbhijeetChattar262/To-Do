import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleUpdateTask = async (
  editingTask: Todo | null,
  newTask: string,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[],
  setNewTask: React.Dispatch<React.SetStateAction<string>>,
  setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>
) => {
  if (!editingTask) return;

  const token = localStorage.getItem("token");
  await axios.put(
    `http://localhost:5000/todos/${editingTask.id}`,
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
};

export default handleUpdateTask;
