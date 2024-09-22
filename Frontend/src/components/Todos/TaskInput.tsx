import React from "react";
import { Form, Button } from "react-bootstrap";
import { TaskInputProps } from "../../interface/Todo";
import { ADD_TASK_LABEL, UPDATE_TASK_LABEL } from "../../constants/LABELS";
import { ADD_TASK_PLACEHOLDER } from "../../constants/PLACEHOLDERS";

const TaskInput: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  onSubmit,
  editingTask,
}) => {
  return (
    <Form className="mb-4 mt-3">
      <Form.Group controlId="formTask">
        <Form.Control
          type="text"
          placeholder={ADD_TASK_PLACEHOLDER}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </Form.Group>
      <Button
        variant={editingTask ? "warning" : "primary"}
        type="submit"
        onClick={onSubmit}
        className="mt-2"
      >
        {editingTask ? UPDATE_TASK_LABEL : ADD_TASK_LABEL}
      </Button>
    </Form>
  );
};

export default TaskInput;
