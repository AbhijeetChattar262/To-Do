import { Button, Form, ListGroup } from "react-bootstrap";
import {
  handleDeleteTask,
  handleEditTask,
  handleToggleCompleted,
} from "../../services/todoServices";
import { TaskListProps } from "../../interface/Todo";

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