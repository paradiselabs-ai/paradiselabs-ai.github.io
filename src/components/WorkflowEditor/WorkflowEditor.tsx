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
    <div className="workflow-editor">
      <div className="workflow-editor__buttons">
        {menuItems.map(({ id, icon: Icon, label, onClick }) => (
          <button
            key={id}
            onClick={() => {
              setSelectedItem(id);
              onClick?.();
            }}
            className={`workflow-editor__button ${
              selectedItem === id ? 'text-gray-900 bg-gray-100' : ''
            }`}
            aria-label={label}
            title={label}
          >
            <Icon className="workflow-editor__button-icon" />
            <span className="workflow-editor__button-text">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkflowEditor;