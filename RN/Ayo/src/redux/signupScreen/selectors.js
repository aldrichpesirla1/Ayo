import {createSelector} from 'reselect';

// needs to be the same in store.js
const signupScreenState = (state) => state.signupScreen;

export const getSelectSignup = createSelector(
      signupScreenState,
      (signupScreen) => signupScreen
)

// what to pass here?
export const getUsername = createSelector(
      signupScreenState,
      (signupScreenState) => signupScreenState.username
)

export const getPassword = createSelector(
      signupScreenState,
      (signupScreenState) => signupScreenState.password
)

export const getPasswordConfirm = createSelector(
      signupScreenState,
      (signupScreenState) => signupScreenState.password_confirm
)

export const getContactNumber = createSelector(
      signupScreenState,
      (signupScreenState) => signupScreenState.contact_number
)

export const getAddress = createSelector(
      signupScreenState,
      (signupScreenState) => signupScreenState.address
)