import React from 'react';
import './Header.scss';

const Header = ({ children }: React.ComponentProps<any>) => (
  <header className="header-container">
    {children}
  </header>
);

export default Header;
