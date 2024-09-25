import React from "react";
import { ListGroupStyled, ListItemStyled, CheckboxStyled } from "../../styles/todo.style";
import Button from "../common/Button/Button";
import TodoServices from "../../services/todo.service";
import { TaskListProps } from "../../interface/Todo/index";
import { EDIT_LABEL, DELETE_LABEL } from "../../constants/labels";

const TaskList: React.FC<TaskListProps> = ({
  todos,
  setTodos,
  setNewTask,
  setEditingTask,
  completed,
}) => {
  const filteredTodos = todos.filter((todo) => todo.completed === completed);

  return (
    <ListGroupStyled>
      {filteredTodos.map((todo) => (
        <ListItemStyled key={todo.id}>
          <div> 
            <CheckboxStyled
              type="checkbox"
              checked={todo.completed}
              onChange={() => TodoServices.handleToggleCompleted(todo.id, setTodos, todos)}
            />
            {todo.task}
          </div>
          <div>
            <Button
              buttonStyle="warning"
              width="auto"
              onClick={() => TodoServices.handleEditTask(todo, setEditingTask, setNewTask)}
            >
              {EDIT_LABEL}
            </Button>
            <Button
              buttonStyle="danger"
              width="auto"
              onClick={() => TodoServices.handleDeleteTask(todo.id, setTodos, todos)}
            >
              {DELETE_LABEL}
            </Button>
          </div>
        </ListItemStyled>
      ))}
    </ListGroupStyled>
  );
};

export default TaskList;
