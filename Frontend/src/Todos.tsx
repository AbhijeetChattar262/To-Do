import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username"); // Get username from local storage

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<Todo[]>("http://localhost:5000/todos", {
        headers: {
          Authorization: token || "",
        },
      });
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post<Todo>(
      "http://localhost:5000/todos",
      { task: newTask },
      {
        headers: {
          Authorization: token || "",
        },
      }
    );
    setTodos([...todos, response.data]);
    setNewTask("");
  };

  const handleDeleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: {
        Authorization: token || "",
      },
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTask = (todo: Todo) => {
    setEditingTask(todo);
    setNewTask(todo.task);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/todos/${editingTask.id}`,
      { task: newTask },
      {
        headers: {
          Authorization: token || "",
        },
      }
    );
    setTodos(
      todos.map((todo) =>
        todo.id === editingTask.id ? { ...todo, task: newTask } : todo
      )
    );
    setNewTask("");
    setEditingTask(null);
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "info",
      title: "Logout",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Clear the token
        localStorage.removeItem("username"); // Clear the username
        navigate("/login"); // Redirect to login page
      }
    });
  };

  const handleToggleCompleted = async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/todos/toggle/${id}`,
      {},
      {
        headers: {
          Authorization: token || "",
        },
      }
    );
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center">Your Todos</h1>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <h3 className="text-center">Welcome back, {username}!</h3>
          <Form className="mb-4 mt-3">
            <Form.Group controlId="formTask">
              <Form.Control
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTask(e.target.value)
                }
              />
            </Form.Group>
            <Button
              variant={editingTask ? "warning" : "primary"}
              onClick={editingTask ? handleUpdateTask : handleAddTask}
              className="mt-2"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>

          <Row>
            <Col>
              <h4>Pending Tasks</h4>
              <ListGroup>
                {todos
                  .filter((todo) => !todo.completed)
                  .map((todo) => (
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <Form.Check
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleCompleted(todo.id)}
                        />
                        {todo.task}
                      </div>
                      <div>
                        <Button
                          variant="info"
                          onClick={() => handleEditTask(todo)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteTask(todo.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>

            <Col>
              <h4>Completed Tasks</h4>
              <ListGroup>
                {todos
                  .filter((todo) => todo.completed)
                  .map((todo) => (
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <Form.Check
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleCompleted(todo.id)}
                        />
                        {todo.task}
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteTask(todo.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Todos;
