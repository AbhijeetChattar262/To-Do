import React, { useEffect, useState, Suspense } from "react";
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
import { PENDING_TASK, COMPLETED_TASK } from "../constants/LABELS";
import LoadingSpinner from "../components/Spinner/LoadingSpinner";
import { Container, Row, Col, TaskTitle } from "../styles/TodoPageStyles"; 

// Lazy load TaskList
const TaskList = React.lazy(() => import("../components/Todos/TaskList"));

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <Container>
      <Header username={username} onLogout={handleUserLogout} />
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        onSubmit={handleSubmit}
        editingTask={!!editingTask}
      />
      <Row>
        <Col>
          <TaskTitle>{PENDING_TASK}</TaskTitle>
          <Suspense fallback={<LoadingSpinner />}>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={false}
            />
          </Suspense>
        </Col>
        <Col>
          <TaskTitle>{COMPLETED_TASK}</TaskTitle>
          <Suspense fallback={<LoadingSpinner />}>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={true}
            />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};
export default Todos;
