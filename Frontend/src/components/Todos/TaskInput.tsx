import React, { useContext } from "react";
import { TodoForm, TodoInput } from "../../styles/todo.style";
import Button from "../common/Button/Button";
import { ADD_TASK_LABEL, UPDATE_TASK_LABEL } from "../../constants/labels";
import { ADD_TASK_PLACEHOLDER } from "../../constants/placeholders";
import {TodoContext} from "../../context/Context";

const TaskInput: React.FC = () => {
  const { newTask, setNewTask, handleSubmit, editingTask } = useContext(TodoContext);
  
  return (
    <TodoForm onSubmit={handleSubmit}>
      <TodoInput
        type="text"
        width={"97%"}
        placeholder={ADD_TASK_PLACEHOLDER}
        value={newTask}
        onChange={(e: any) => setNewTask(e.target.value)}
        required
      />
      <Button type="submit" buttonStyle="primary" width="auto">
        {editingTask ? UPDATE_TASK_LABEL : ADD_TASK_LABEL}
      </Button>
    </TodoForm>
  );
};

export default TaskInput;
