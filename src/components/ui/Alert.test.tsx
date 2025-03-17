import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';

describe('Alert Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with the correct message', () => {
    render(
      <Alert 
        id="test-alert" 
        type="info" 
        message="Test alert message" 
      />
    );
    
    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('renders the correct icon based on alert type', () => {
    const { rerender } = render(
      <Alert 
        id="info-alert" 
        type="info" 
        message="Info alert" 
      />
    );

    // Check that the right ARIA role is applied
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    // Verify different alert types display correctly
    rerender(<Alert id="success-alert" type="success" message="Success alert" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
    
    rerender(<Alert id="warning-alert" type="warning" message="Warning alert" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');
    
    rerender(<Alert id="error-alert" type="error" message="Error alert" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    
    render(
      <Alert 
        id="test-alert" 
        type="info" 
        message="Test alert message" 
        onClose={handleClose}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Wait for the animation duration before onClose is called
    vi.advanceTimersByTime(300);
    expect(handleClose).toHaveBeenCalledWith('test-alert');
  });

  it('auto-closes after the specified time if autoClose is true', async () => {
    const handleClose = vi.fn();
    
    render(
      <Alert 
        id="test-alert" 
        type="info" 
        message="Test alert message" 
        onClose={handleClose}
        autoClose={true}
        autoCloseTime={2000}
      />
    );
    
    expect(handleClose).not.toHaveBeenCalled();
    
    // Fast-forward time
    vi.advanceTimersByTime(2000);
    
    // Wait for animation to complete
    vi.advanceTimersByTime(300);
    
    expect(handleClose).toHaveBeenCalledWith('test-alert');
  });

  it('does not auto-close if autoClose is false', () => {
    const handleClose = vi.fn();
    
    render(
      <Alert 
        id="test-alert" 
        type="info" 
        message="Test alert message" 
        onClose={handleClose}
        autoClose={false}
      />
    );
    
    // Fast-forward time
    vi.advanceTimersByTime(10000);
    
    expect(handleClose).not.toHaveBeenCalled();
  });
}); 