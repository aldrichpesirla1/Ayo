import {createSelector} from 'reselect';

// needs to be the same in store.js
const loginScreenState = (state) => state.loginScreen;

// what to pass here?
export const makeSelectUsers = createSelector(
      loginScreenState,
      (apiTestScreen) => apiTestScreen.username
)