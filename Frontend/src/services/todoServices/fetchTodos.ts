import axios from "axios";
import { Todo } from "../../interface/Todo";
import { TODO_API_URL } from "../../constants/API_URLS";
import { FETCH_TODOS_ERROR } from "../../constants/CONSOLE_ERRORS";

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
    console.error({ FETCH_TODOS_ERROR}, error); // Log any errors
  }
};

export default fetchTodos;
