// src/App.tsx
import React from 'react';
import Header from './components/Header/Header';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './components/WorkflowEditor/WorkflowEditor';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="h-screen flex flex-col" data-theme={theme}>
      <Header />
      <div className="flex flex-1 h-[calc(100vh-72px)] mt-[72px]">
        <WorkflowEditor />
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <WorkflowBuilder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;