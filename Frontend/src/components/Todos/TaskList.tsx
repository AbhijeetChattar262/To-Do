import React, { useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { Todo } from "../../interface/Todo";
import {
  handleDeleteTask,
  handleEditTask,
  handleToggleCompleted,
} from "../../services/todoServices";
import { getTaskSuggestions } from "../../utils/geminiApi"; // Import the Gemini API function

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
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store suggestions
  const [showModal, setShowModal] = useState(false); // For displaying suggestions in a modal
  const [currentTask, setCurrentTask] = useState<string | null>(null); // Track current task being edited

  // API Key should be passed from process.env or securely managed in your environment
  const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY || ""; 

  const handleGetSuggestions = async (task: string) => {
    setCurrentTask(task);
    try {
      const response = await getTaskSuggestions(task, apiKey); // Get suggestions using API
      setSuggestions(response);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions(["No suggestions available at this time."]);
    }
    setShowModal(true); // Show modal with suggestions
  };

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
              <Button
                variant="warning"
                className="me-2 my-1"
                onClick={() => handleGetSuggestions(todo.task)} // Get suggestions for this task
              >
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
            <div dangerouslySetInnerHTML={{ __html: suggestions.join('<br/>') }} />
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