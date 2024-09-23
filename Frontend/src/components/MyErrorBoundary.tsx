import { Component, ReactNode } from "react";
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'; // Import the fallback UI

// Define the types for Props and State
interface MyErrorBoundaryProps {
  children: ReactNode;
}

interface MyErrorBoundaryState {
  hasError: boolean;
}

class MyErrorBoundary extends Component<MyErrorBoundaryProps, MyErrorBoundaryState> {
  constructor(props: MyErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // This lifecycle method catches errors in child components
  static getDerivedStateFromError(): MyErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Render the custom ErrorBoundary component
      return <ErrorBoundary />;
    }

    return this.props.children;
  }
}

export default MyErrorBoundary;
