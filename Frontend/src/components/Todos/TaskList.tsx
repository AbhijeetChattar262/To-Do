import { Button, Form, ListGroup } from "react-bootstrap";
import { Todo } from "../../interface/Todo";
import {
  handleDeleteTask,
  handleEditTask,
  handleToggleCompleted,
} from "../../services/todoServices";

interface TaskListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>;
  completed: any;
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  setTodos,
  setNewTask,
  setEditingTask,
  completed,
}) => {
  console.log("Todos:", todos, "Completed:", completed); // Debugging
  const filteredTodos = todos.filter((todo) => todo.completed === completed);
  console.log(todos.forEach((todo) => console.log(todo.completed)));

  console.log("Filtered Todos:", filteredTodos);

  return (
    <ListGroup>
      {filteredTodos.map((todo) => (
        <ListGroup.Item
          key={todo.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id, setTodos, todos)}
            />
            {todo.task}
          </div>
          <div>
            <Button
              variant="info"
              onClick={() => handleEditTask(todo, setEditingTask, setNewTask)}
              className="me-2"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteTask(todo.id, setTodos, todos)}
            >
              Delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TaskList;
