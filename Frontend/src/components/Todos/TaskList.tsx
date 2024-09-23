import React from "react";
import { Button, ButtonDelete, ListGroupStyled, ListItemStyled, CheckboxStyled } from "../../styles/TodoStyles";
import {
  handleDeleteTask,
  handleEditTask,
  handleToggleCompleted,
} from "../../services/todoServices";
import { TaskListProps } from "../../interface/Todo/index";
import { EDIT_LABEL, DELETE_LABEL } from "../../constants/LABELS";

const TaskList: React.FC<TaskListProps> = ({
  todos,
  setTodos,
  setNewTask,
  setEditingTask,
  completed,
}) => {
  // throw new Error("Oops! Something went wrong.");

  const filteredTodos = todos.filter((todo) => todo.completed === completed);
  return (
    <ListGroupStyled>
      {filteredTodos.map((todo) => (
        <ListItemStyled key={todo.id}>
          <div className="d-flex align-items-center">
            <CheckboxStyled
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id, setTodos, todos)}
            />
            {todo.task}
          </div>
          <div>
            <Button
              onClick={() => handleEditTask(todo, setEditingTask, setNewTask)}
            >
              {EDIT_LABEL}
            </Button>
            <ButtonDelete
              onClick={() => handleDeleteTask(todo.id, setTodos, todos)}
            >
              {DELETE_LABEL}
            </ButtonDelete>
          </div>
        </ListItemStyled>
      ))}
    </ListGroupStyled>
  );
};

export default TaskList;
