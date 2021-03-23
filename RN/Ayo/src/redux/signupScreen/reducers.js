/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      username : '',
      password : '',
      password_confirm: '',
      contact_number: '',
      address: '',
}


export default function signupScreenReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_USERNAME:
                  return {...state, username:action.payload}
            case ActionTypes.SET_PASSWORD:
                  return {...state, password:action.payload}
            case ActionTypes.SET_PASSWORD_CONFIRM:
                  return {...state, password_confirm:action.payload}
            case ActionTypes.SET_CONTACT_NUMBER:
                  return {...state, contact_number:action.payload}
            case ActionTypes.SET_ADDRESS:
                  return {...state, address:action.payload}
            default:
                  return state;
      }
}
