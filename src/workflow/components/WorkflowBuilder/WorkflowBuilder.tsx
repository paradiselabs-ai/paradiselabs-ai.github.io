// src/workflow/components/WorkflowBuilder/WorkflowBuilder.tsx
import React from 'react';
import InteractiveBackground from './InteractiveBackground';
import { useTheme } from '../../hooks/useTheme';
import '../Workflow.css';

const WorkflowBuilder: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="workflow-app">
    <div className="absolute inset-0" data-theme={theme}>
      <InteractiveBackground/>
      <div className="relative z-10 h-full">
        <div className="p-6">
          {/* Add your workflow building interface here */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default WorkflowBuilder;