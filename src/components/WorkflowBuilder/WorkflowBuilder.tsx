import React from 'react';
import InteractiveBackground from './InteractiveBackground';

const WorkflowBuilder: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <InteractiveBackground />
      <div className="relative z-10 h-full">
        <div className="p-6">
          {/* Add your workflow building interface here */}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;