import { ACCOUNTS } from '../actions/types';
import ls from 'local-storage';

const DEFAULT_ACCOUNTS = [];

const accountsReducer = (state = DEFAULT_ACCOUNTS, action) => {

    switch(action.type){
        case ACCOUNTS.LOAD:
            const {accounts} = action;
            return {accounts};
        case ACCOUNTS.SAVE:
            ({accounts} = action);
            ls.set('accounts', accounts);
            return state;
        default:
            return state;
    }
}

export default accountsReducer