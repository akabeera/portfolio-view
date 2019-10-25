import { combineReducers } from 'redux';
import addAccountReducer from './addAccount';
import accountsReducer from './accounts';
//import accountRowReducer from './accountRow';

export default combineReducers({
    addAccount: addAccountReducer,
    accounts: accountsReducer
    //accountRow: accountRowReducer
});

/*
const rootReducer = () => {};

export default rootReducer;
*/