import { useCallback } from 'react';
import { useAppState } from './AppState';
import { ActionType } from './AppState';

/**
 * Hook for handling UI-related state
 */
export const useUIState = () => {
  const { state, dispatch } = useAppState();
  
  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  }, [dispatch]);
  
  const setActiveSection = useCallback((section: string | null) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  }, [dispatch]);
  
  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, [dispatch]);
  
  const addAlert = useCallback((type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    dispatch({ 
      type: 'ADD_ALERT', 
      payload: { type, message } 
    });
    
    // Auto-remove alerts after 5 seconds
    const alertId = Date.now().toString();
    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT', payload: alertId });
    }, 5000);
    
    return alertId;
  }, [dispatch]);
  
  const removeAlert = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ALERT', payload: id });
  }, [dispatch]);
  
  return {
    isLoading: state.ui.isLoading,
    activeSection: state.ui.activeSection,
    sidebarOpen: state.ui.sidebarOpen,
    alerts: state.ui.alerts,
    setLoading,
    setActiveSection,
    toggleSidebar,
    addAlert,
    removeAlert
  };
};

/**
 * Hook for handling user state
 */
export const useUserState = () => {
  const { state, dispatch } = useAppState();
  
  const setLoggedIn = useCallback((isLoggedIn: boolean) => {
    dispatch({ type: 'SET_USER_LOGGED_IN', payload: isLoggedIn });
  }, [dispatch]);
  
  const setRegistered = useCallback((isRegistered: boolean) => {
    dispatch({ type: 'SET_USER_REGISTERED', payload: isRegistered });
  }, [dispatch]);
  
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, [dispatch]);
  
  const setNotifications = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: enabled });
  }, [dispatch]);
  
  return {
    isLoggedIn: state.user.isLoggedIn,
    isRegistered: state.user.isRegistered,
    theme: state.user.preferences.theme,
    notifications: state.user.preferences.notifications,
    setLoggedIn,
    setRegistered,
    setTheme,
    setNotifications
  };
};

/**
 * Hook for handling waitlist state
 */
export const useWaitlistState = () => {
  const { state, dispatch } = useAppState();
  
  const setSubmissionInProgress = useCallback((inProgress: boolean) => {
    dispatch({ type: 'SET_WAITLIST_SUBMISSION_IN_PROGRESS', payload: inProgress });
  }, [dispatch]);
  
  const setSubmissionSuccess = useCallback((success: boolean) => {
    dispatch({ type: 'SET_WAITLIST_SUBMISSION_SUCCESS', payload: success });
  }, [dispatch]);
  
  const setSubmissionError = useCallback((error: Error | null) => {
    dispatch({ type: 'SET_WAITLIST_SUBMISSION_ERROR', payload: error });
  }, [dispatch]);
  
  const resetWaitlistState = useCallback(() => {
    setSubmissionInProgress(false);
    setSubmissionSuccess(false);
    setSubmissionError(null);
  }, [setSubmissionInProgress, setSubmissionSuccess, setSubmissionError]);
  
  return {
    submissionInProgress: state.waitlist.submissionInProgress,
    submissionSuccess: state.waitlist.submissionSuccess,
    submissionError: state.waitlist.submissionError,
    setSubmissionInProgress,
    setSubmissionSuccess,
    setSubmissionError,
    resetWaitlistState
  };
}; 