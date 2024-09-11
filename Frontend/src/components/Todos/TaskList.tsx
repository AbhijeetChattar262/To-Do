import React, { useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
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
  completed: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  setTodos,
  setNewTask,
  setEditingTask,
  completed,
}) => {
  const [showModal, setShowModal] = useState(false); // For displaying suggestions in a modal
  const [currentTask, setCurrentTask] = useState<string | null>(null); // Track current task being edited

  const filteredTodos = todos.filter((todo) => todo.completed === completed);

  return (
    <>
      <ListGroup>
        {filteredTodos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id, setTodos, todos)}
                className="me-2"
              />
              <div>
                <div>{todo.task}</div>
              </div>
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
              <Button variant="warning" className="me-2 my-1">
                Get Suggestions
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for showing task suggestions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Suggestions for Task: "{currentTask}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {suggestions.length > 0 ? (
            <div
              dangerouslySetInnerHTML={{ __html: suggestions.join("<br/>") }}
            />
          ) : (
            <p>No suggestions available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskList;
