// To combine all reducers together instead of implementing in 1 file
import {combineReducers} from 'redux';
import loggedReducer from './isLogged';
import userReducer from './userReducer';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    username: userReducer
})

export default allReducers;