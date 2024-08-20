import axios from "axios";
import { Todo } from "../../interface/Todo";

const fetchTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const token = localStorage.getItem("token");
  const response = await axios.get<Todo[]>("http://localhost:5000/todos", {
    headers: {
      Authorization: token || "",
    },
  });
  setTodos(response.data);
};

export default fetchTodos;
