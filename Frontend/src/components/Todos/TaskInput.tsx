import React from "react";
import { Form, Input, Button } from "../../styles/TodoStyles";
import { TaskInputProps } from "../../interface/Todo/index";
import { ADD_TASK_LABEL, UPDATE_TASK_LABEL } from "../../constants/LABELS";
import { ADD_TASK_PLACEHOLDER } from "../../constants/PLACEHOLDERS";

const TaskInput: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  onSubmit,
  editingTask,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder={ADD_TASK_PLACEHOLDER}
        value={newTask}
        onChange={(e:any) => setNewTask(e.target.value)}
      />
      <Button type="submit">
        {editingTask ? UPDATE_TASK_LABEL : ADD_TASK_LABEL}
      </Button>
    </Form>
  );
};

export default TaskInput;
