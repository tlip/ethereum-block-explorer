import React from 'react';

import { Switch, Route, Redirect } from 'react-router';
import ExplorerView from '../Views/ExplorerView';
import Nav from '../common/Nav';

import './Content.scss';

// Themed Component
//
const Content = () => (
  <div className="content-container">
    <Nav />
    <Switch>
      <Route path="/explorer" component={ExplorerView} />
      <Route path="/" render={() => <Redirect to="/explorer" />} />
    </Switch>
  </div>
);

export default Content;
