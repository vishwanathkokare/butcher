// filepath: /workspaces/butcher/client/src/components/ui/ThemeToggle.tsx
import React, { useState } from 'react';
import { faSun,faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ThemeToggle: React.FC = () => {
  const [theme,setTheme] = useState<Boolean>(false); 
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme(true);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme(false);
    }
  };

  React.useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme(false);
    } else {
      document.documentElement.classList.remove('dark');
      setTheme(true);
    }
  }, []);

  return (
    <button onClick={toggleTheme} className="p-2 px-4 rounded-full dark:bg-zinc-900 bg-white">
      {theme && theme ? <FontAwesomeIcon icon={faMoon} className="text-zinc-800" /> :
      <FontAwesomeIcon icon={faSun} className="text-yellow-200" />}
    </button>
  );
};

export default ThemeToggle;