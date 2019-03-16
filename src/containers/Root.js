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
    <div>
      <AppShell />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'}}
        >
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/secondPage" component={SecondPage} />
      </div>
    </div>
  </Router>
)

export default Root;
