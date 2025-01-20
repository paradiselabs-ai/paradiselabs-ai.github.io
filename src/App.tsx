import React from 'react';
import Header from './components/Header/Header';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import WorkflowControls from './components/WorkflowControls/WorkflowControls';
import WorkflowEditor from './components/WorkflowEditor/WorkflowEditor';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content Area - subtract header height */}
      <div className="flex flex-1 h-[calc(100vh-72px)] mt-[72px]">
        {/* Sidebar Editor */}
        <WorkflowEditor />
        
        {/* Main Workspace */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <WorkflowBuilder />
          </div>
         {/* <WorkflowControls />*/}
        </div>
      </div>
    </div>
  );
};

export default App;