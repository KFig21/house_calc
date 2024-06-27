import React from 'react';
import { Brightness3, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../../contexts/themeContext';
import './themeToggle.scss';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'light' && <Brightness7 />}
      {theme === 'dark' && <Brightness4 />}
      {theme === 'night' && <Brightness3 />}
    </button>
  );
};

export default ThemeToggleButton;
