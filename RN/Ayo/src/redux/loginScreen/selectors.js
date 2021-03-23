import {createSelector} from 'reselect';

// needs to be the same in store.js
const loginScreenState = (state) => state.loginScreen;

export const getSelectLogin = createSelector(
      loginScreenState,
      (loginScreen) => loginScreen
)

// what to pass here?
export const getUsername = createSelector(
      loginScreenState,
      (loginScreenState) => loginScreenState.username
)

export const getPassword = createSelector(
      loginScreenState,
      (loginScreenState) => loginScreenState.password
)