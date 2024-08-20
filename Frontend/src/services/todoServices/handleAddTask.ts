import axios from "axios";
import { Todo } from "../../interface/Todo";

const handleAddTask = async (
  newTask: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setNewTask: React.Dispatch<React.SetStateAction<string>>
) => {
  const token = localStorage.getItem("token");
  const response = await axios.post<Todo>(
    "http://localhost:5000/todos",
    { task: newTask },
    {
      headers: {
        Authorization: token || "",
      },
    }
  );
  setTodos([...todos, response.data]);
  setNewTask("");
};

export default handleAddTask;
