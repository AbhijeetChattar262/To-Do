import axios from "axios";
import { Todo } from "../../interface/Todo";

const fetchTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<Todo[]>("http://localhost:5000/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(response.data);
  } catch (error) {
    console.error("Failed to fetch todos:", error); // Log any errors
  }
};

export default fetchTodos;
