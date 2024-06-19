import React from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../../contexts/themeContext';
import './themeToggle.scss';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
    </button>
  );
};

export default ThemeToggleButton;
