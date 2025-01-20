import React from 'react';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './components/WorkflowControls/WorkflowControls';

const App: React.FC = () => {
  return (
    <div className="app">
      <WorkflowBuilder />
      <WorkflowControls />
    </div>
  );
};

export default App;
