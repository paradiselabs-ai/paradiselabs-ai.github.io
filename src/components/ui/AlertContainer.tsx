import React from 'react';
import Alert from './Alert';
import { useUIState } from '../../context/hooks';

/**
 * Container component that displays alerts from the global UI state
 */
const AlertContainer: React.FC = () => {
  const { alerts, removeAlert } = useUIState();
  
  if (alerts.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-50 w-80 max-w-full">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
};

export default AlertContainer; 