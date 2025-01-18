// filepath: /workspaces/butcher/client/src/components/ui/ThemeToggle.tsx
import React from 'react';

const ThemeToggle: React.FC = () => {
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <button onClick={toggleTheme} className="p-2 rounded bg-zinc-900 dark:bg-gray-200 text-white dark:text-black">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;