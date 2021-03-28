import {ActionTypes} from './constants';

export function setUsername(username) {
      return (
            {
                  type: ActionTypes.SET_USERNAME,
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