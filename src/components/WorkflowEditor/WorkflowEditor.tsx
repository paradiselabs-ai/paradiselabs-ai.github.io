// src/components/WorkflowEditor/WorkflowEditor.tsx
import React from 'react';
import { Plus, Sparkles, Trash2 } from 'lucide-react';

const WorkflowEditor: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<string>('add');

  const menuItems = [
    { id: 'add', icon: Plus, label: 'Add' },
    { id: 'askAi', icon: Sparkles, label: 'Ask AI' },
    { id: 'clear', icon: Trash2, label: 'Clear' }
  ];

  return (
    <div className="workflow-editor">
      <div className="workflow-editor__buttons">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setSelectedItem(id)}
            className={`workflow-editor__button ${
              selectedItem === id ? 'text-gray-900' : ''
            }`}
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