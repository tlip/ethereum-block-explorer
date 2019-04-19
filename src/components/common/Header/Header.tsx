import React from 'react';
import './Header.scss';

const Header = ({ children }: React.ComponentProps<any>) => (
  <div className="header-container">
    {children}
  </div>
);

export default Header;
