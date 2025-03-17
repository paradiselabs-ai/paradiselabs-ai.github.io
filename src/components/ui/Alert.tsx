import React, { useState, useEffect } from 'react';

export interface AlertProps {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  onClose?: (id: string) => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export const Alert: React.FC<AlertProps> = ({
  id,
  type,
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose(id);
        }, 300); // Allow fade out animation to complete
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, id, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose(id);
    }, 300);
  };
  
  // Define styles based on alert type
  const getAlertStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-300 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-300 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-300 text-red-800';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-800';
    }
  };
  
  // Define icon based on alert type
  const getAlertIcon = () => {
    switch (type) {
      case 'info':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`
        flex items-start p-4 mb-3 rounded-lg border
        ${getAlertStyles()}
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-2'}
      `}
      role="alert"
    >
      <div className="flex-shrink-0">
        {getAlertIcon()}
      </div>
      <div className="ml-3 text-sm font-medium">
        {message}
      </div>
      <button
        type="button"
        className={`
          ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${type === 'info' ? 'focus:ring-blue-400 hover:bg-blue-100' : ''}
          ${type === 'success' ? 'focus:ring-green-400 hover:bg-green-100' : ''}
          ${type === 'warning' ? 'focus:ring-yellow-400 hover:bg-yellow-100' : ''}
          ${type === 'error' ? 'focus:ring-red-400 hover:bg-red-100' : ''}
        `}
        aria-label="Close"
        onClick={handleClose}
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

export default Alert; 