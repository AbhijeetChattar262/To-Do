import { createContext } from "react";
import { TodoContextType } from "../interface/Context";

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);
export const TaskCompletedContext = createContext<boolean>(false);

