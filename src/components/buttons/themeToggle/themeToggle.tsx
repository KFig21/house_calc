import React from 'react';
import { Brightness3, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../../contexts/themeContext';
import './themeToggle.scss';

interface props {
  type: string;
}

const ThemeToggleButton: React.FC<props> = ({ type }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className={`theme-toggle-button ${type}`}>
      {theme === 'light' && <Brightness7 />}
      {theme === 'dark' && <Brightness4 />}
      {theme === 'night' && <Brightness3 />}
    </button>
  );
};

export default ThemeToggleButton;
