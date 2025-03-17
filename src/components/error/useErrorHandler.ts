import { useState, useCallback } from 'react';

/**
 * A custom hook for handling errors in functional components
 * This complements ErrorBoundary by allowing functional components to manually
 * report errors that can't be caught by the boundaries automatically
 * 
 * @example
 * const MyComponent = () => {
 *   const { error, handleError } = useErrorHandler();
 *   
 *   if (error) {
 *     return <ErrorFallback error={error} />;
 *   }
 *   
 *   const fetchData = async () => {
 *     try {
 *       // Some async operation that might fail
 *     } catch (err) {
 *       handleError(err);
 *     }
 *   };
 *   
 *   return <div>...</div>;
 * };
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: unknown) => {
    // Convert unknown errors to Error objects for consistent handling
    if (error instanceof Error) {
      console.error('Error handled:', error);
      setError(error);
    } else {
      const unknownError = new Error(
        typeof error === 'string' ? error : 'An unknown error occurred'
      );
      console.error('Unknown error handled:', error);
      setError(unknownError);
    }
  }, []);
  
  // Reset the error state
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  
  return { error, handleError, resetError };
};

export default useErrorHandler; 