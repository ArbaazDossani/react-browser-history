import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { actions as reactBrowserHistoryReducer, convertLocationQueryStringToObject, isForwardBrowserAction } from '../reducers/reactBrowserHistoryReducer';

class AppShell extends React.Component {
  constructor() {
    super();
    this.state = {
      browserNavigation: false,
      isBrowserForward: false,
    };
  }
  componentDidMount() {
    window.routerHistory = this.props.history;
    // Sync Redux with Current Location without Refreshing the history State of the browser
    const currentLoc = {
      ...this.props.location,
      query: convertLocationQueryStringToObject(this.props.location.search),
    };
    const dontAlterBrowserHistory = true;
    this.props.historyPush(currentLoc, dontAlterBrowserHistory);
  }
  componentWillReceiveProps(nextProps) {
    const thisLoc = this.props.location;
    const nextLoc = nextProps.location;
    // If there is browser back / forward detected, update history stack in redux, but do not alter browser history
    if (isEqual(nextProps.history.action, 'POP') && !isEqual(nextLoc.key, thisLoc.key)) {
      const isBrowserForward = isForwardBrowserAction(nextProps, this.props);
      const dontAlterBrowserHistory = true;
      this.setState({
        browserNavigation: true,
        isBrowserForward
      });
      if (!isBrowserForward) {
        if (!isEqual(`${nextLoc.pathname}${nextLoc.search}`, `${thisLoc.pathname}${thisLoc.search}`)
          && nextProps.historyStack.length > 1) {
          this.props.historyGoBack(1, dontAlterBrowserHistory);
        }
      } else {
        this.props.historyPush(nextProps.location, dontAlterBrowserHistory);
      }
    }
  }
  render() {
    return (
      <div style={{width: '100%'}}>
        { this.state.browserNavigation &&
            <div style={{ position:'absolute', border: '1px solid black', padding: 20, margin: 10, left: 0 }}>
              Browser Navigation Clicked:
              <br/>
              { this.state.isBrowserForward ? 'Forward' : 'Back' }
            </div>
        }
        <div style={{ position:'absolute', border: '1px solid black', padding: 20, margin: 10, right: 0 }}>
          Last History Action:
          <br/>
          { this.props.history.action && <span>{this.props.history.action}</span> }
        </div>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  historyPush : (newLoc, dontAlterBrowserHistory) => dispatch(reactBrowserHistoryReducer.historyPush(newLoc, dontAlterBrowserHistory)),
  historyGoBack : (payload, dontAlterBrowserHistory) => dispatch(reactBrowserHistoryReducer.historyGoBack(payload, dontAlterBrowserHistory)),
})

const mapStateToProps = (state) => ({
  historyStack: state.reactBrowserHistoryReducer.get('historyStack'),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppShell));
