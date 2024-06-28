import React from 'react';
import './header.scss';
import ThemeToggleButton from '../buttons/themeToggle/themeToggle';
import Logo from './logo/logo';

const Header: React.FC = () => {
  return (
    <div className="header">
      <ThemeToggleButton type="mobile" />
      <Logo />
      <div className="header-text">Home Buying Calculator</div>
    </div>
  );
};

export default Header;
