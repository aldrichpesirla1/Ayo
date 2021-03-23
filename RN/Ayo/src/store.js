import {createStore, combineReducers} from 'redux';

import apiTestScreen from './redux/testScreen/reducers';
import loginScreen from './redux/loginScreen/reducers'

const reducers = combineReducers({loginScreen, apiTestScreen});

export default createStore(reducers);