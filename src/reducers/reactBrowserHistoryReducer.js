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


// Actions
export const types = {
  INITIAL: 'app/reactBrowserHistory/INITIAL',
  HISTORY_PUSH: 'app/reactBrowserHistory/HISTORY_PUSH',
}

// Reducer
export const initialState = fromJS({
  historyStack: []
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL:
      return initialState;
    case types.HISTORY_PUSH:
      const historyStack = [...state.get('historyStack')];
      historyStack.push(action.newLoc);
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
      const queryString = !isEmpty(query) ? convertLocationQueryObjectToString(query) : '';
      window.routerHistory.push(`${pathname}${queryString}`);
    }
    return { type: types.HISTORY_PUSH, newLoc }
  },
};
