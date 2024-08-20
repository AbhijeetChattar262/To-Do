import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Todo } from "../interface/Todo";
import {
  handleAddTask,
  handleUpdateTask,
} from "../services/todoServices/todoServices";
import { handleLogout } from "../services/authServices/authServices";
import fetchTodos from "../services/todoServices/fetchTodos";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username"); // Get username from local storage

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center">Your Todos</h1>
            <Button variant="danger" onClick={() => handleLogout(navigate)}>
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
              onClick={
                editingTask
                  ? () =>
                      handleUpdateTask(
                        editingTask,
                        newTask,
                        setTodos,
                        todos,
                        setNewTask,
                        setEditingTask
                      )
                  : () => handleAddTask(newTask, todos, setTodos, setNewTask)
              }
              className="mt-2"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </Form>

          <Row>
            <Col>
              <h4>Pending Tasks</h4>
            </Col>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={false}
            />
            <Col>
              <h4>Completed Tasks</h4>
            </Col>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={true}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Todos;
