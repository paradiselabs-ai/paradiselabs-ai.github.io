// src/App.tsx
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WorkflowHeader from './workflow/components/WorkflowHeader/WorkflowHeader';
import HomepageHeader from './home/components/HomepageHeader';
import WorkflowBuilder from './workflow/components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './workflow/components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './workflow/components/WorkflowEditor/WorkflowEditor';
import { useTheme } from './workflow/hooks/useTheme';
import Home from './home/Home';
import Docs from './documentation/Docs';
import { ErrorBoundary } from './components/error';
import { AppProvider } from './context/AppState';
import { useUserState } from './context/hooks';
import AlertContainer from './components/ui/AlertContainer';
import FontPreloader from './components/FontPreloader';

// Custom error handler for logging errors to monitoring service
const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
  // In production, we would send this to a monitoring service like Sentry
  console.error('Application error:', error);
  console.error('Component stack:', errorInfo.componentStack);
};

// Separate component inside the Provider to use hooks
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { theme: userTheme } = useUserState();
  
  // Apply theme from user preferences
  useEffect(() => {
    // Only apply if not already applied by the workflow theme
    if (document.documentElement.getAttribute('data-theme') !== theme) {
      document.documentElement.setAttribute('data-theme', userTheme === 'system' 
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : userTheme
      );
    }
  }, [userTheme, theme]);

  return (
    <ErrorBoundary onError={handleError}>
      <FontPreloader />
      <HashRouter>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-2"
          style={{ clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', height: '1px' }}
        >
          Skip to main content
        </a>
        <AlertContainer />
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen">
              <HomepageHeader />
              <main id="main-content">
                <ErrorBoundary
                  onError={handleError}
                  fallback={
                    <div className="p-6 max-w-4xl mx-auto my-8">
                      <div className="p-6 bg-gradient-to-br from-[#F8F9FA]/10 to-[#F8F9FA]/5 backdrop-blur-sm rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-semibold text-[#F6F2FF] mb-4">
                          We're experiencing technical difficulties
                        </h2>
                        <p className="text-[#F6F2FF]/80 mb-6">
                          The GLUE team has been notified. Please try again later or contact support if the problem persists.
                        </p>
                        <button
                          onClick={() => window.location.reload()}
                          className="bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 py-2 px-6 rounded-xl hover:translate-y-[-2px] transition-all duration-300"
                        >
                          Refresh Page
                        </button>
                      </div>
                    </div>
                  }
                >
                  <Home />
                </ErrorBoundary>
              </main>
            </div>
          } />
          <Route path="/docs" element={
            <div className="min-h-screen">
              <HomepageHeader />
              <main id="main-content">
                <ErrorBoundary onError={handleError}>
                  <Docs />
                </ErrorBoundary>
              </main>
            </div>
          } />
          <Route path="/workflow" element={
            <div className="h-screen flex flex-col" data-theme={theme}>
              <WorkflowHeader />
              <div className="flex flex-1 h-[calc(100vh-72px)] mt-[72px]">
                <WorkflowEditor />
                <main id="main-content" className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <ErrorBoundary onError={handleError}>
                      <WorkflowBuilder />
                    </ErrorBoundary>
                  </div>
                </main>
              </div>
            </div>
          } />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
