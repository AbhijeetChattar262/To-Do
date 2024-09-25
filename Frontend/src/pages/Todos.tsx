import React, { useEffect, useState, Suspense } from "react";
import { Todo } from "../interface/Todo";
import TodoServices from "../services/TodoServices";
import  AuthService from "../services/AuthServices";

import { useNavigate } from "react-router-dom";
import TaskInput from "../components/Todos/TaskInput";
import Header from "../components/Todos/TodoHeader";
import { PENDING_TASK, COMPLETED_TASK } from "../constants/LABELS";
import Spinner from "../components/common/Spinner/Spinner";
import {
  TasksContainer,
  TaskTitle,
  TodoContainer,
  TaskColumn,
} from "../styles/TodoStyles";

const TaskList = React.lazy(() => import("../components/Todos/TaskList"));

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    TodoServices.fetchTodos(setTodos);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      TodoServices.handleUpdateTask(
        editingTask, 
        newTask,
        setTodos,
        todos,
        setNewTask,
        setEditingTask
      );
    } else {
      console.log("Before adding task:", newTask); // Log the task being added
      TodoServices.handleAddTask(newTask, todos, setTodos, setNewTask);
    }
  };

  const handleUserLogout = () => {
    AuthService.handleLogout(navigate);
  };

  return (
    <TodoContainer>
      <Header username={username} onLogout={handleUserLogout} />
      <TaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        onSubmit={handleSubmit}
        editingTask={!!editingTask}
      />
      <TasksContainer>
        <TaskColumn>
          <TaskTitle>{PENDING_TASK}</TaskTitle>
          <Suspense fallback={<Spinner />}>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={false}
            />
          </Suspense>
        </TaskColumn>

        <TaskColumn>
          <TaskTitle>{COMPLETED_TASK}</TaskTitle>
          <Suspense fallback={<Spinner />}>
            <TaskList
              todos={todos}
              setTodos={setTodos}
              setNewTask={setNewTask}
              setEditingTask={setEditingTask}
              completed={true}
            />
          </Suspense>
        </TaskColumn>
      </TasksContainer>
    </TodoContainer>
  );
};

export default Todos;
