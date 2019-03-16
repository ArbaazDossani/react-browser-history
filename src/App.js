import React from 'react';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux';
import './App.css';
import Root from './containers/Root';
import reactBrowserHistory from './reducers';

// Creating the Redux Store as reactBrowserHistory.
// Enabling REDUX DEV TOOLS.
let store = createStore(
  reactBrowserHistory,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose()
)

const App = () => (
  <Provider store={store}>
    <div>
      <div className="App">
        <Root />
      </div>
    </div>
  </Provider>
);

export default App;
