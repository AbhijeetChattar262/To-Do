import { Todo } from "../../interface/Todo";

const handleEditTask = (
  todo: Todo,
  setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>,
  setNewTask: React.Dispatch<React.SetStateAction<string>>
) => {
  setEditingTask(todo);
  setNewTask(todo.task);
};

export default handleEditTask;
