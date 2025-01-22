// src/components/WorkflowBuilder/WorkflowBuilder.tsx
import React from 'react';
import InteractiveBackground from './InteractiveBackground';
import { useTheme } from '../../hooks/useTheme';

const WorkflowBuilder: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0" data-theme={theme}>
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