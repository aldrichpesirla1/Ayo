import {createStore, combineReducers} from 'redux';

import apiTestScreen from './redux/testScreen/reducers';
import loginScreen from './redux/loginScreen/reducers'
import signupScreen from './redux/signupScreen/reducers'

const reducers = combineReducers({loginScreen, apiTestScreen, signupScreen});

export default createStore(reducers);