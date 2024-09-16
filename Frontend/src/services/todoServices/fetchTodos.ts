import axios from "axios";
import { Todo } from "../../interface/Todo";
import { TODO_API_URL } from "../../constants/API_URLS";

const fetchTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<Todo[]>(TODO_API_URL, {
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
