import React from 'react';
import { Undo2, Redo2, Download, Play } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__left">
        <span className="header__logo-text">WorkflowAI</span>
        <div className="header__actions" style={{ marginLeft: '150px' }}>
          <button 
            className="header__button" 
            title="Undo"
            aria-label="Undo"
          >
            <Undo2 />
          </button>
          <button 
            className="header__button" 
            title="Redo"
            aria-label="Redo"
          >
            <Redo2 />
          </button>
        </div>
      </div>
      
      <div className="header__actions">
        <button 
          className="header__button" 
          title="Export your code"
          aria-label="Export your code"
        >
          <Download />
        </button>
        <button 
          className="header__button header__button--run" 
          title="Preview component"
          aria-label="Run preview"
        >
          <Play />
          <span>Run</span>
        </button>
      </div>
    </div>
  );
};

export default Header;