import React from 'react';
import {
  withRouter
} from 'react-router-dom';

class AppShell extends React.Component {
  componentDidMount() {
    window.routerHistory = this.props.history;
  }
  render() {
    return (
      <div>
        Last History Action: { this.props.history.action }
      </div>
    )
  }
}

export default withRouter(AppShell) ;
