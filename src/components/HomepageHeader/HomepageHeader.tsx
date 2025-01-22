import React from 'react';
import { Link } from 'react-router-dom';

const HomepageHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-8 bg-white shadow-sm z-50">
      <Link to="/" className="text-xl font-bold text-gray-800">
        Glue
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link to="/docs" className="text-gray-600 hover:text-gray-900">
          Documentation
        </Link>
        <Link to="/workflow" className="text-gray-600 hover:text-gray-900">
          Workflow Editor
        </Link>
      </nav>
    </header>
  );
};

export default HomepageHeader;