import React from 'react';
import { connect } from 'react-redux';
import { actions as reactBrowserHistoryReducer } from '../reducers/reactBrowserHistoryReducer';

class Dashboard extends React.Component {
  historyPush(){
    const newLoc = {
      pathname: '/secondPage',
      query: {
        pushed: true,
      }
    }
    this.props.historyPush(newLoc);
  }
  render() {
    return (
      <div>
        <div style={{ border: '1px solid black', padding: 20, marginBottom: 40 }}> Current Page: Dashboard </div>
        { this.props.historyStack.length > 1 && <button style={{ border: '1px solid black', padding: 20, marginRight: 20 }} onClick={() => this.props.historyGoBack()}> Go Back to Previous Screen </button>}
        <button style={{ border: '1px solid black', padding: 20 }} onClick={() => this.historyPush()}>Push Another Page</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  historyStack: state.reactBrowserHistoryReducer.get('historyStack'),
})

const mapDispatchToProps = (dispatch) => ({
  historyPush : (newLoc, dontAlterBrowserHistory) => dispatch(reactBrowserHistoryReducer.historyPush(newLoc, dontAlterBrowserHistory)),
  historyGoBack : (payload, dontAlterBrowserHistory) => dispatch(reactBrowserHistoryReducer.historyGoBack(payload, dontAlterBrowserHistory)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
