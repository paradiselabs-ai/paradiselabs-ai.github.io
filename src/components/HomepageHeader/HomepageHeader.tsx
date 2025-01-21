/* src\components\HomepageHeader\HomepageHeader.tsx */ 
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const HomepageHeader: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-8 bg-white dark:bg-gray-800 shadow-sm z-50">
      <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
        Glue
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Home
        </Link>
        <Link to="/docs" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Documentation
        </Link>
        <Link to="/workflow" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Workflow Editor
        </Link>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
};

export default HomepageHeader;
