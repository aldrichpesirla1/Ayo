/* 
TODO:
-get password confirmation
*/

import {ActionTypes} from './constants';

const defaultState = {
      username : '',
      password : '',
}


export default function loginScreenReducer(state = defaultState, action) {
      switch(action.type){
            case ActionTypes.SET_USERNAME:
                  return {...state, username:action.payload}
            case ActionTypes.SET_PASSWORD:
                  return {...state, password:action.payload}
            default:
                  return state;
      }
}
