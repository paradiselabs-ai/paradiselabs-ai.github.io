// src/components/WorkflowEditor/WorkflowEditor.tsx
import React from 'react';
import { Plus, Sparkles, Trash2, LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

const WorkflowEditor: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<string>('add');

  const menuItems: MenuItem[] = [
    { 
      id: 'add', 
      icon: Plus, 
      label: 'Add',
      onClick: () => console.log('Add clicked')
    },
    { 
      id: 'askAi', 
      icon: Sparkles, 
      label: 'Ask AI',
      onClick: () => console.log('Ask AI clicked')
    },
    { 
      id: 'clear', 
      icon: Trash2, 
      label: 'Clear',
      onClick: () => console.log('Clear clicked')
    }
  ];

  return (
    <nav className="workflow-editor" aria-label="Workflow tools">
      <div className="workflow-editor__buttons" role="toolbar" aria-label="Workflow editing tools">
        {menuItems.map(({ id, icon: Icon, label, onClick }) => (
          <button
            key={id}
            onClick={() => {
              setSelectedItem(id);
              onClick?.();
            }}
            className={`workflow-editor__button group ${
              selectedItem === id ? 'workflow-editor__button--selected' : ''
            }`}
            aria-label={label}
            title={label}
            aria-pressed={selectedItem === id}
          >
            <span className="workflow-editor__button-content">
              <Icon className="workflow-editor__button-icon" />
              <span className="workflow-editor__button-text">{label}</span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default WorkflowEditor;