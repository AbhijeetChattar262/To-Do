import { ReactNode } from "react";

// Define the types for Props and State
export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
