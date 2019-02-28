import { fromJS } from 'immutable';
import isEmpty from 'lodash/isEmpty';

// utils
function convertLocationQueryObjectToString(locationQueryObject = {}) {
  const queryStringArr = [];
  Object.keys(locationQueryObject).forEach((key) => {
    if (locationQueryObject[key] !== undefined && locationQueryObject[key] !== null && locationQueryObject[key] !== 'undefined' && locationQueryObject[key] !== 'null') {
      queryStringArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(locationQueryObject[key])}`);
    }
  });
  return queryStringArr.length > 0 ? `?${queryStringArr.join('&')}` : '';
}

export function convertLocationQueryStringToObject(locationQueryString) {
  let trimmedURL = locationQueryString;
  if (locationQueryString.indexOf('?') === 0) {
    trimmedURL = locationQueryString.substr(1);
  }
  if (locationQueryString.indexOf('&') === 0) {
    trimmedURL = locationQueryString.substr('&'.length);
  }
  return trimmedURL.split('&').reduce((prev, curr) => {
    const p = curr.split('=');
    prev[decodeURIComponent(p[0])] = decodeURIComponent(curr.substring(p[0].length + 1) || ''); // eslint-disable-line
    return prev;
  }, {});
}

export function isForwardBrowserAction(nextProps, props) {
  const keyStack = nextProps.history.getAllKeys();
  return keyStack.indexOf(nextProps.location.key) > keyStack.indexOf(props.location.key);
}


// Actions
export const types = {
  INITIAL: 'app/reactBrowserHistory/INITIAL',
  HISTORY_PUSH: 'app/reactBrowserHistory/HISTORY_PUSH',
  HISTORY_GOBACK: 'app/reactBrowserHistory/HISTORY_GOBACK',
  HISTORY_REPLACE: 'app/reactBrowserHistory/HISTORY_REPLACE',
}

// Reducer
export const initialState = fromJS({
  historyStack: []
})

export default (state = initialState, action) => {
  const historyStack = [...state.get('historyStack')];
  switch (action.type) {
    case types.INITIAL:
      return initialState;

    case types.HISTORY_PUSH:
      if (action.newLoc) {
        historyStack.push(action.newLoc);
        return state
        .set('historyStack', historyStack)
      }
      break;

    case types.HISTORY_REPLACE:
      if (action.newLoc) {
        if (historyStack.length > 0) {
          historyStack.pop();
        }
        historyStack.push(action.newLoc);
        return state
        .set('historyStack', historyStack)
      }
      break;

    case types.HISTORY_GOBACK:
      for (let i = 0; i < (action.payload || 0); i += 1) {
        historyStack.pop();
      }
      return state
        .set('historyStack', historyStack)
    default:
      return state;
  }
};

// Action Creators
export const actions = {
  historyPush: (newLoc, dontAlterBrowserHistory = false) => {
    if (!dontAlterBrowserHistory) {
      const { pathname, query } = newLoc;
      const search = !isEmpty(query) ? convertLocationQueryObjectToString(query) : '';
      newLoc.search = search;
      window.routerHistory.push(`${pathname}${search}`);
    }
    return { type: types.HISTORY_PUSH, newLoc }
  },
  historyReplace: (newLoc) => {
    const { pathname, query } = newLoc;
    const search = !isEmpty(query) ? convertLocationQueryObjectToString(query) : '';
    newLoc.search = search;
    window.routerHistory.replace(`${pathname}${search}`);
    return { type: types.HISTORY_REPLACE, newLoc }
  },
  historyGoBack: (payload = 1, dontAlterBrowserHistory = false) => {
    if (!dontAlterBrowserHistory) {
      window.routerHistory.go(-1 * payload);
    }
    return { type: types.HISTORY_GOBACK, payload };
  }
};
