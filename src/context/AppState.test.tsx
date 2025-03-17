import { describe, it, expect, beforeEach } from 'vitest';
import { appReducer, initialState, AppState, ActionType } from './AppState';

describe('AppState Reducer', () => {
  let state: AppState;

  beforeEach(() => {
    // Start with a fresh copy of the initial state for each test
    state = JSON.parse(JSON.stringify(initialState));
  });

  describe('User actions', () => {
    it('should handle SET_USER_LOGGED_IN', () => {
      const action: ActionType = { type: 'SET_USER_LOGGED_IN', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.user.isLoggedIn).toBe(true);
      expect(newState).not.toBe(state); // Ensure state immutability
    });

    it('should handle SET_USER_REGISTERED', () => {
      const action: ActionType = { type: 'SET_USER_REGISTERED', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.user.isRegistered).toBe(true);
      expect(newState).not.toBe(state);
    });

    it('should handle SET_THEME', () => {
      const action: ActionType = { type: 'SET_THEME', payload: 'dark' };
      const newState = appReducer(state, action);
      
      expect(newState.user.preferences.theme).toBe('dark');
    });

    it('should handle SET_NOTIFICATIONS', () => {
      const action: ActionType = { type: 'SET_NOTIFICATIONS', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.user.preferences.notifications).toBe(true);
    });
  });

  describe('UI actions', () => {
    it('should handle SET_LOADING', () => {
      const action: ActionType = { type: 'SET_LOADING', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.ui.isLoading).toBe(true);
    });

    it('should handle SET_ACTIVE_SECTION', () => {
      const action: ActionType = { type: 'SET_ACTIVE_SECTION', payload: 'about' };
      const newState = appReducer(state, action);
      
      expect(newState.ui.activeSection).toBe('about');
    });

    it('should handle TOGGLE_SIDEBAR', () => {
      // Initial state: sidebar is closed
      expect(state.ui.sidebarOpen).toBe(false);
      
      // Toggle on
      let action: ActionType = { type: 'TOGGLE_SIDEBAR' };
      let newState = appReducer(state, action);
      expect(newState.ui.sidebarOpen).toBe(true);
      
      // Toggle off
      newState = appReducer(newState, action);
      expect(newState.ui.sidebarOpen).toBe(false);
    });

    it('should handle ADD_ALERT', () => {
      const action: ActionType = { 
        type: 'ADD_ALERT', 
        payload: { 
          type: 'info', 
          message: 'Test alert' 
        } 
      };
      
      const newState = appReducer(state, action);
      
      expect(newState.ui.alerts.length).toBe(1);
      expect(newState.ui.alerts[0].type).toBe('info');
      expect(newState.ui.alerts[0].message).toBe('Test alert');
      expect(newState.ui.alerts[0].id).toBeDefined();
    });

    it('should handle REMOVE_ALERT', () => {
      // First add an alert
      let action: ActionType = { 
        type: 'ADD_ALERT', 
        payload: { 
          type: 'info', 
          message: 'Test alert' 
        } 
      };
      
      let newState = appReducer(state, action);
      const alertId = newState.ui.alerts[0].id;
      
      // Then remove it
      action = { type: 'REMOVE_ALERT', payload: alertId };
      newState = appReducer(newState, action);
      
      expect(newState.ui.alerts.length).toBe(0);
    });
  });

  describe('Waitlist actions', () => {
    it('should handle SET_WAITLIST_SUBMISSION_IN_PROGRESS', () => {
      const action: ActionType = { type: 'SET_WAITLIST_SUBMISSION_IN_PROGRESS', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.waitlist.submissionInProgress).toBe(true);
    });

    it('should handle SET_WAITLIST_SUBMISSION_SUCCESS', () => {
      const action: ActionType = { type: 'SET_WAITLIST_SUBMISSION_SUCCESS', payload: true };
      const newState = appReducer(state, action);
      
      expect(newState.waitlist.submissionSuccess).toBe(true);
      expect(newState.waitlist.submissionError).toBe(null); // Should reset error
    });

    it('should handle SET_WAITLIST_SUBMISSION_ERROR', () => {
      const testError = new Error('Test error');
      const action: ActionType = { type: 'SET_WAITLIST_SUBMISSION_ERROR', payload: testError };
      const newState = appReducer(state, action);
      
      expect(newState.waitlist.submissionError).toBe(testError);
      expect(newState.waitlist.submissionSuccess).toBe(false); // Should reset success
    });
  });

  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const newState = appReducer(state, action);
    
    expect(newState).toBe(state);
  });
}); 