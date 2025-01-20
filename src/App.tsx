// src/App.tsx
import React from 'react';
import Header from './components/Header/Header';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './components/WorkflowEditor/WorkflowEditor';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <WorkflowEditor />
        <div className="app__main">
          <WorkflowBuilder />
          <WorkflowControls />
        </div>
      </div>
    </div>
  );
};

export default App;