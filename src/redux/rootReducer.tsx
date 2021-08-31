import {combineReducers} from 'redux';
import AuthReducer from './authRedux/Reducer';

const rootReducer = combineReducers({
  AuthUser: AuthReducer,
});

export default rootReducer;
