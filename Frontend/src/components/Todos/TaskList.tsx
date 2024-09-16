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
  const filteredTodos = todos.filter((todo) => todo.completed == completed);
  return (
    <ListGroup>
      {filteredTodos.map((todo) => (
        <ListGroup.Item
          key={todo.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input border-dark"
              id="customCheck1"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id, setTodos, todos)}
            />
            <label className="form-check-label" htmlFor="customCheck1">
              {todo.task}
            </label>
          </div>

          <div>
            <Button
              variant="info"
              onClick={() => handleEditTask(todo, setEditingTask, setNewTask)}
              className="me-2 my-1"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="me-2 my-1"
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
