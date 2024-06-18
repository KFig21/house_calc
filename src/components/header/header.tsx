import React from 'react';
import './header.scss';
import ThemeToggleButton from '../buttons/themeToggle';

const Header: React.FC = () => {
  return (
    <div className="header">
      <ThemeToggleButton />
      <div className="header-text">Home Buying Calculator</div>
    </div>
  );
};

export default Header;
