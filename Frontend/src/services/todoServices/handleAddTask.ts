import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleAddTask = async (
  newTask: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTask: React.Dispatch<React.SetStateAction<string>>
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/todos",
      { task: newTask },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos([...todos, response.data]);
    setNewTask("");
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

export default handleAddTask;
