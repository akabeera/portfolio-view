import { combineReducers } from 'redux';
import accountsReducer from './accounts';

export default combineReducers({
    accounts: accountsReducer
});