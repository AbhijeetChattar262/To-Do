import axios from "axios";
import { Todo } from "../../interface/Todo";
import { TODO_API_URL } from "../../constants/API_URLS";

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
};

export default handleUpdateTask;
