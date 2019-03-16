import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import Dashboard from './Dashboard';
import SecondPage from './SecondPage';
import AppShell from './AppShell';
import history from '../utils/history';

const Root = () => (
  <Router history={history}>
    <div style={{width:'100%'}}>
      <AppShell />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/secondPage" component={SecondPage} />
    </div>
  </Router>
)

export default Root;
