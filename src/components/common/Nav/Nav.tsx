import React from 'react';
import { withRouter } from 'react-router-dom';

import * as Icons from '../Icons';

import './Nav.scss';

const Nav = ({ location }: { location: { pathname: string }}) => (
  <nav className="nav-container">
    <div className="nav-header">
      <Icons.Infura />
    </div>
    <div className="nav-links">
      <div className="nav-link">
        <Icons.Tachometer />
        <span>DASHBOARD</span>
      </div>
      <div className="nav-link">
        <Icons.Folder />
        <span>PROJECTS</span>
      </div>
      <div className={`nav-link ${location.pathname.includes('/explorer') && 'active'}`}>
        <Icons.Grid />
        <span>EXPLORER</span>
      </div>
    </div>
    <div className="nav-footer">
      <div className="nav-link">
        <Icons.Cog />
        <span>SETTINGS</span>
      </div>
      <div className="nav-link">
        <Icons.PowerOFf />
        <span>LOGOUT</span>
      </div>
    </div>
  </nav>
);

export default withRouter(Nav);
