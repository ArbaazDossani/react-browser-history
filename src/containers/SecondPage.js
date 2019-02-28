import React from 'react';
import { connect } from 'react-redux';
import { actions as reactBrowserHistoryReducer } from '../reducers/reactBrowserHistoryReducer';

class SecondPage extends React.Component {
  historyPush(){
    const newLoc = {
      pathname: '/',
      query: {
        pushed: true,
      }
    }
    this.props.historyPush(newLoc);
  }

  render() {
    return (
      <div style={{width:'100%'}}>
        <div> Current Page: Second Page </div>
        <div onClick={() => this.historyPush()}>Click to push First Page</div>
        or
        <div onClick={() => this.props.historyGoBack()}> Go Back to Previous Screen </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage);
