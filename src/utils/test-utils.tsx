import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppProvider } from '../context/AppState';

/**
 * Custom render function that wraps components with necessary providers for testing
 */
const AllTheProviders: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
};

/**
 * Custom render method that includes app providers
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 