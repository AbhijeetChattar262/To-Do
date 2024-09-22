import axios from "axios";
import { Todo } from "../../interface/Todo";
import Alert from "../../components/Alert/Alert";
import { TODO_API_URL } from "../../constants/API_URLS";
import { TASK_CANNOT_BE_EMPTY_ALERT } from "../../constants/ALERTS";
import { FAILED_TO_ADD_TASK_ERROR, TASK_CANNOT_BE_EMPTY_ERROR } from "../../constants/CONSOLE_ERRORS";

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
      alertType: TASK_CANNOT_BE_EMPTY_ALERT,
    });
    console.error({ TASK_CANNOT_BE_EMPTY_ERROR });
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
    console.error({FAILED_TO_ADD_TASK_ERROR}, error);
  }
};

export default handleAddTask;
