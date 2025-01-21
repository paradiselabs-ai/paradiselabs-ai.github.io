// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkflowHeader from './components/WorkflowHeader/WorkflowHeader';
import HomepageHeader from './components/HomepageHeader/HomepageHeader';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './components/WorkflowEditor/WorkflowEditor';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import Docs from './pages/Docs';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen" data-theme={theme}>
            <HomepageHeader />
            <Home />
          </div>
        } />
        <Route path="/docs" element={
          <div className="min-h-screen" data-theme={theme}>
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
