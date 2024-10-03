import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import TodoServices from "../services/todo.service";
import AuthService from "../services/auth.service";
import TaskInput from "../components/Todos/TaskInput";
import { PENDING_TASK, COMPLETED_TASK } from "../constants/labels";
import Spinner from "../components/common/Spinner/Spinner";
import {
  TasksContainer,
  TaskTitle,
  TodoContainer,
  TaskColumn,
} from "../styles/todo.style";
import { TodoContext,TaskCompletedContext } from "../context/Context";
import TodoHeader from "../components/Todos/TodoHeader";
import { Todo } from "../interface/Todo";

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
      TodoServices.handleAddTask(newTask, todos, setTodos, setNewTask);
    }
  };

  const handleUserLogout = () => {
    AuthService.handleLogout(navigate);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        newTask,
        setNewTask,
        editingTask,
        setEditingTask,
        handleSubmit,
        handleUserLogout,
        username,
      }}
    >
      <TodoContainer>
        <TodoHeader />
        <TaskInput />
        <TasksContainer>
          <TaskColumn>
            <TaskCompletedContext.Provider value={false}>
              <TaskTitle>{PENDING_TASK}</TaskTitle>
              <Suspense fallback={<Spinner />}>
                <TaskList />
              </Suspense>
            </TaskCompletedContext.Provider>
          </TaskColumn>

          <TaskColumn>
            <TaskCompletedContext.Provider value={true}>
            <TaskTitle>{COMPLETED_TASK}</TaskTitle>
            <Suspense fallback={<Spinner />}>
              <TaskList />
            </Suspense>
            </TaskCompletedContext.Provider>
          </TaskColumn>
        </TasksContainer>
      </TodoContainer>
    </TodoContext.Provider>
  );
};

export default Todos;
