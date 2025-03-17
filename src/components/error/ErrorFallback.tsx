import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  showDetails?: boolean;
  title?: string;
  message?: string;
}

/**
 * A reusable component for displaying user-friendly error messages
 * Can be used as a fallback UI for ErrorBoundary or with useErrorHandler
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  showDetails = false,
  title = 'Something went wrong',
  message = 'We apologize for the inconvenience. Please try again or refresh the page.'
}) => {
  return (
    <div className="p-4 border border-red-300 rounded-md bg-red-50 text-red-800">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="mb-4">{message}</p>
      
      {showDetails && (
        <details className="text-sm">
          <summary className="cursor-pointer">Technical details</summary>
          <p className="mt-2 p-2 bg-white/30 rounded overflow-auto max-h-32">
            {error.message || error.toString()}
          </p>
          {error.stack && (
            <pre className="mt-2 p-2 bg-white/30 rounded overflow-auto text-xs max-h-48">
              {error.stack}
            </pre>
          )}
        </details>
      )}
      
      <div className="mt-4 flex gap-3">
        {resetErrorBoundary && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
        )}
        <button
          className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback; 