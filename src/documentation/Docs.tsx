/* src\pages\Docs.tsx */ 
import React from 'react';
import './Docs.css';

const Docs: React.FC = () => {
  return (
    <div className="docs-container">
      <h1>Glue Documentation</h1>
      
      <section className="docs-section">
        <h2>Getting Started</h2>
        <p>
          Learn how to set up Glue and create your first workflow.
        </p>
      </section>

      <section className="docs-section">
        <h2>Core Concepts</h2>
        <ul>
          <li>Binding System (TAPE, VELCRO, GLUE)</li>
          <li>Magnetic Field Coordination</li>
          <li>Declarative Configuration</li>
        </ul>
      </section>

      <section className="docs-section">
        <h2>API Reference</h2>
        <p>
          Detailed documentation for Glue's DSL and configuration options.
        </p>
      </section>

      <section className="docs-section">
        <h2>Examples</h2>
        <p>
          Practical examples demonstrating Glue's capabilities.
        </p>
      </section>
    </div>
  );
};

export default Docs;
