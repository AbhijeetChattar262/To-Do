import { Todo } from "../../interface/Todo";

export interface TodoContextType {
    todos: Todo[]; 
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
    newTask: string;
    setNewTask: React.Dispatch<React.SetStateAction<string>>; 
    editingTask: Todo | null;
    setEditingTask: React.Dispatch<React.SetStateAction<Todo | null>>; 
    handleSubmit: (e: React.FormEvent) => void; 
    handleUserLogout: () => void; 
    username: string | null; 
};
