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
      <div style={{width:'100%'}}>
        <span> Current Page: Dashboard </span>
        <span onClick={() => this.historyPush()}>Click to push History</span>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  historyStack: state.reactBrowserHistoryReducer.get('historyStack'),
})

const mapDispatchToProps = (dispatch) => ({
  historyPush : (newLoc, dontAlterBrowserHistory) => dispatch(reactBrowserHistoryReducer.historyPush(newLoc, dontAlterBrowserHistory)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
