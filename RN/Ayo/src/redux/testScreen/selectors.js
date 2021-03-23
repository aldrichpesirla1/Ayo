import {createSelector} from 'reselect';

// needs to be the same in store.js
const apiTestScreenState = (state) => state.apiTestScreen;

export const makeSelectUsers = createSelector(
      apiTestScreenState,
      (apiTestScreen) => apiTestScreen.users
)