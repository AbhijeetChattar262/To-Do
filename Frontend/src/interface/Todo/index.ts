export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

export interface HeaderProps {
  username: string | null;
  onLogout: () => void;
}

export interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  editingTask: boolean;
}

export interface TaskListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>;
  completed: any;
}


