import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Todo } from "../interface/Todo";
import {
  handleAddTask,
  handleUpdateTask,
  fetchTodos,
} from "../services/todoServices";
import { handleLogout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import TaskInput from "../components/Todos/TaskInput";
import Header from "../components/Todos/Header";
import TaskList from "../components/Todos/TaskList";
import { PENDING_TASK, COMPLETED_TASK } from "../constants/LABELS";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const handleSubmit = () => {
    if (editingTask) {
      handleUpdateTask(
        editingTask,
        newTask,
        setTodos,
        todos,
        setNewTask,
        setEditingTask
      );
    } else {
      handleAddTask(newTask, todos, setTodos, setNewTask);
    }
  };

  const handleUserLogout = () => {
    handleLogout(navigate);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Header username={username} onLogout={handleUserLogout} />
          <TaskInput
            newTask={newTask}
            setNewTask={setNewTask}
            onSubmit={handleSubmit}
            editingTask={!!editingTask}
          />
          <Row>
            <Col>
              <h3>{PENDING_TASK}</h3>
              <TaskList
                todos={todos}
                setTodos={setTodos}
                setNewTask={setNewTask}
                setEditingTask={setEditingTask}
                completed={false}
              />
            </Col>
            <Col>
              <h3>{COMPLETED_TASK}</h3>
              <TaskList
                todos={todos}
                setTodos={setTodos}
                setNewTask={setNewTask}
                setEditingTask={setEditingTask}
                completed={true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Todos;
