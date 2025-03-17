import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// Define types for our application state
export interface AppState {
  user: {
    isLoggedIn: boolean;
    isRegistered: boolean;
    preferences: {
      theme: 'light' | 'dark' | 'system';
      notifications: boolean;
    }
  };
  ui: {
    isLoading: boolean;
    activeSection: string | null;
    sidebarOpen: boolean;
    alerts: {
      id: string;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }[];
  };
  waitlist: {
    submissionInProgress: boolean;
    submissionSuccess: boolean;
    submissionError: Error | null;
  };
}

// Define the initial state
export const initialState: AppState = {
  user: {
    isLoggedIn: false,
    isRegistered: localStorage.getItem('glue_registered') === 'true',
    preferences: {
      theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
      notifications: localStorage.getItem('notifications') === 'true'
    }
  },
  ui: {
    isLoading: false,
    activeSection: null,
    sidebarOpen: false,
    alerts: []
  },
  waitlist: {
    submissionInProgress: false,
    submissionSuccess: false,
    submissionError: null
  }
};

// Define action types
export type ActionType = 
  | { type: 'SET_USER_LOGGED_IN', payload: boolean }
  | { type: 'SET_USER_REGISTERED', payload: boolean }
  | { type: 'SET_THEME', payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_NOTIFICATIONS', payload: boolean }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ACTIVE_SECTION', payload: string | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_ALERT', payload: Omit<AppState['ui']['alerts'][0], 'id'> }
  | { type: 'REMOVE_ALERT', payload: string }
  | { type: 'SET_WAITLIST_SUBMISSION_IN_PROGRESS', payload: boolean }
  | { type: 'SET_WAITLIST_SUBMISSION_SUCCESS', payload: boolean }
  | { type: 'SET_WAITLIST_SUBMISSION_ERROR', payload: Error | null };

// Create the reducer function
export const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: action.payload
        }
      };
    
    case 'SET_USER_REGISTERED':
      // Also update localStorage for persistence
      localStorage.setItem('glue_registered', action.payload.toString());
      return {
        ...state,
        user: {
          ...state.user,
          isRegistered: action.payload
        }
      };
    
    case 'SET_THEME':
      // Also update localStorage for persistence
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            theme: action.payload
          }
        }
      };
    
    case 'SET_NOTIFICATIONS':
      // Also update localStorage for persistence
      localStorage.setItem('notifications', action.payload.toString());
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            notifications: action.payload
          }
        }
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload
        }
      };
    
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        ui: {
          ...state.ui,
          activeSection: action.payload
        }
      };
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
    
    case 'ADD_ALERT':
      const newAlert = {
        id: Date.now().toString(),
        ...action.payload
      };
      return {
        ...state,
        ui: {
          ...state.ui,
          alerts: [...state.ui.alerts, newAlert]
        }
      };
    
    case 'REMOVE_ALERT':
      return {
        ...state,
        ui: {
          ...state.ui,
          alerts: state.ui.alerts.filter(alert => alert.id !== action.payload)
        }
      };
    
    case 'SET_WAITLIST_SUBMISSION_IN_PROGRESS':
      return {
        ...state,
        waitlist: {
          ...state.waitlist,
          submissionInProgress: action.payload
        }
      };
    
    case 'SET_WAITLIST_SUBMISSION_SUCCESS':
      return {
        ...state,
        waitlist: {
          ...state.waitlist,
          submissionSuccess: action.payload,
          // Reset error if success is set to true
          submissionError: action.payload ? null : state.waitlist.submissionError
        }
      };
    
    case 'SET_WAITLIST_SUBMISSION_ERROR':
      return {
        ...state,
        waitlist: {
          ...state.waitlist,
          submissionError: action.payload,
          // Reset success if error is set
          submissionSuccess: action.payload ? false : state.waitlist.submissionSuccess
        }
      };
    
    default:
      return state;
  }
};

// Create the context
type AppContextType = {
  state: AppState;
  dispatch: Dispatch<ActionType>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
  children: ReactNode;
  initialState?: AppState;
}

export const AppProvider: React.FC<AppProviderProps> = ({ 
  children,
  initialState: customInitialState
}) => {
  const [state, dispatch] = useReducer(appReducer, customInitialState || initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the app context
export const useAppState = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  
  return context;
}; 