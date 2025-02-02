// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <HomepageHeader />
            <Home />
          </div>
        } />
        <Route path="/docs" element={
          <div className="min-h-screen">
            <HomepageHeader />
            <Docs />
          </div>
        } />
        <Route path="/workflow" element={
          <div className="h-screen flex flex-col" data-theme={theme}>
            <WorkflowHeader />
            <div className="flex flex-1 h-[calc(100vh-72px)] mt-[72px]">
              <WorkflowEditor />
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <WorkflowBuilder />
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;