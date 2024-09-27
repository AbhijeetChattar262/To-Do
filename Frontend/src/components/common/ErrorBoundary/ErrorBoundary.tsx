import { Component } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundaryTypes";
import FallbackComponent from "./FallbackComponent/FallbackComponent";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // This lifecycle method catches errors in child components
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Render the custom ErrorBoundary component
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
