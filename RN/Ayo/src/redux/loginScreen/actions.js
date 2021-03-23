import {ActionTypes} from './constants';

export function setUsername(username) {
      return (
            {
                  type: ActionTypes.SET_USERS,
                  payload: username
            }
      )
}

export function setPassword(password) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD,
                  payload: password 
            }
      )
}

export function setPasswordConfirm(passwordConfirm) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD_CONFIRM,
                  payload: passwordConfirm 
            }
      )
}

export function setContactNumber(contactNumber) {
      return (
            {
                  type: ActionTypes.SET_CONTACT_NUMBER,
                  payload: contactNumber 
            }
      )
}

export function setAddress(address) {
      return (
            {
                  type: ActionTypes.SET_ADDRESS,
                  payload: address
            }
      )
}