import axios from "axios";
import { Todo } from "../../interface/Todo";
import Alert from "../../components/Alert/Alert";
import { TODO_API_URL } from "../../constants/API_URLS";

const handleAddTask = async (
  newTask: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTask: React.Dispatch<React.SetStateAction<string>>
) => {
  // Trim the new task to remove any leading or trailing whitespace
  const trimmedTask = newTask.trim();

  // Check if the task is empty after trimming
  if (!trimmedTask) {
    Alert({
      alertType: "taskCannotBeEmpty",
    });
    console.error("Task cannot be empty");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      TODO_API_URL,
      { task: trimmedTask },
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
