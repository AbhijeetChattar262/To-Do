import React from "react";
import { TodoForm ,TodoInput} from "../../styles/TodoStyles";
import Button from "../common/Button/Button";
import { TaskInputProps } from "../../interface/Todo/index";
import { ADD_TASK_LABEL,UPDATE_TASK_LABEL} from "../../constants/LABELS";
import { ADD_TASK_PLACEHOLDER } from "../../constants/PLACEHOLDERS";

const TaskInput: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  onSubmit,
  editingTask
}) => {
  return (
    <TodoForm onSubmit={onSubmit}>
      <TodoInput
        type="text"
        width={"97%"}
        placeholder={ADD_TASK_PLACEHOLDER}
        value={newTask}
        onChange={(e:any) => setNewTask(e.target.value)}
        required
      />
      <Button type="submit" buttonStyle="primary" width="auto">
        {editingTask ? UPDATE_TASK_LABEL : ADD_TASK_LABEL}
      </Button>
    </TodoForm>
  );
};

export default TaskInput;
