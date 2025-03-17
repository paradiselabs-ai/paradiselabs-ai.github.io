import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (props: {
    error: Error;
    resetBoundary: () => void;
  }) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * A specialized error boundary for API calls with retry functionality.
 * Designed specifically for forms and data submission components.
 */
class APIErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
    this.resetBoundary = this.resetBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error
    console.error('API Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
    
    // Call the optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetBoundary(): void {
    // Reset the error state
    this.setState({
      hasError: false,
      error: null
    });
    
    // Call the optional reset handler
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          resetBoundary: this.resetBoundary
        });
      }

      // Default API error fallback
      return (
        <div className="p-4 border border-amber-300 rounded-md bg-amber-50 text-amber-800">
          <h3 className="font-semibold mb-2">Connection Error</h3>
          <p className="mb-4">We couldn't complete your request. Please check your connection and try again.</p>
          
          <details className="text-sm mb-4">
            <summary className="cursor-pointer">Error details</summary>
            <p className="mt-2 p-2 bg-white/30 rounded">
              {this.state.error.message}
            </p>
          </details>
          
          <button
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            onClick={this.resetBoundary}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default APIErrorBoundary; 