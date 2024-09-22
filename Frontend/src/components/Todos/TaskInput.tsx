import React from "react";
import { Form, Button } from "react-bootstrap";
import { TaskInputProps } from "../../interface/Todo";


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
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
      </Form.Group>
      <Button
        variant={editingTask ? "warning" : "primary"}
        type="submit"
        onClick={onSubmit}
        className="mt-2"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </Button>
    </Form>
  );
};

export default TaskInput;
