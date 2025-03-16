// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WorkflowHeader from './workflow/components/WorkflowHeader/WorkflowHeader';
import HomepageHeader from './home/components/HomepageHeader';
import WorkflowBuilder from './workflow/components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './workflow/components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './workflow/components/WorkflowEditor/WorkflowEditor';
import { useTheme } from './workflow/hooks/useTheme';
import Home from './home/Home';
import Docs from './documentation/Docs';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <HashRouter>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline focus:outline-2"
        style={{ clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', height: '1px' }}
      >
        Skip to main content
      </a>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <HomepageHeader />
            <main id="main-content">
              <Home />
            </main>
          </div>
        } />
        <Route path="/docs" element={
          <div className="min-h-screen">
            <HomepageHeader />
            <main id="main-content">
              <Docs />
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
                  <WorkflowBuilder />
                </div>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
