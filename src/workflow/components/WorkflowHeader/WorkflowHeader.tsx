// src/components/WorkflowHeader/WorkflowHeader.tsx
import React from 'react';
import { Undo2, Redo2, Download, Play, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import '../Workflow.css';

const WorkflowHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="workflow-app">
    <div className="header">
      <div className="header__left">
        <span className="header__logo-text">WorkflowAI</span>
        <div className="header__actions" style={{ marginLeft: '150px' }}>
          <button 
            className="header__button" 
            title="Undo"
            aria-label="Undo"
            /* Undo node configuration or placement or whatever */
          >
            <Undo2 />
          </button>
          <button 
            className="header__button" 
            title="Redo"
            aria-label="Redo"
            /* Redo node configuration or placement or whatever */
          >
            <Redo2 />
          </button>
        </div>
      </div>
      
      <div className="header__actions">
        <button 
          className="header__button"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
        <button 
          className="header__button" 
          title="Export your code"
          aria-label="Export your code"
          /* Exports the visual workflow nodes in a .glue format code */
        >
          <Download />
        </button>
        <button 
          className="header__button header__button--run" 
          title="Preview component"
          aria-label="Run preview"
          /* Runs the visual workflow nodes in a preview mode (To be done later) */
        >
          <Play />
          <span>Run</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default WorkflowHeader;