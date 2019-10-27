import { ACCOUNTS } from '../actions/types';
import ls from 'local-storage';

const DEFAULT_ACCOUNTS = {
    accounts:[]
};

const accountsReducer = (state = DEFAULT_ACCOUNTS, action) => {
    let acctId = '';
    switch(action.type){
        case ACCOUNTS.LOAD:
            state.accounts = ls.get('accounts') || [];
            return {...state};

        case ACCOUNTS.SAVE:
            ls.set('accounts', state.accounts);
            return {...state};

        case ACCOUNTS.ADD_ACCOUNT:
            const {newAccount} = action;
            let currAccounts = state.accounts.slice();
            currAccounts.push(newAccount);
            return {...state, accounts:currAccounts};

        case ACCOUNTS.ADD_ROW:
            const {newHoldings} = action;
            acctId = action.acctId;
            for(let i = 0; i < state.accounts.length; ++i){
                let curr = state.accounts[i];
                if (curr.id === acctId) {
                    let holdings = curr.holdings.slice();
                    holdings.push(newHoldings)
                    curr.holdings = holdings;
                    break;
                }
            }
            
            return {...state};
            
        case ACCOUNTS.UPDATE_ROW:

            acctId = action.acctId;
            let id = action.id;
            let fieldName = action.fieldName;
            let fieldValue = action.fieldValue;

            for(let i = 0; i < state.accounts.length; ++i){
                let curr = state.accounts[i];
                if (curr.id !== acctId) {
                    continue;
                }

                let updatedHoldings = curr.holdings.slice();
              
                let idx = -1;
                for (let j = 0; j<updatedHoldings.length; ++j){
                    if (updatedHoldings[j].id === id){
                        idx = j;
                        break;
                    }
                }
                
                updatedHoldings[idx][fieldName.toLowerCase()] = fieldValue;
                curr.holdings =  updatedHoldings;
                break;
            }
            
            return {...state};
            
        case ACCOUNTS.SELECT_ACCT_TYPE:

            acctId = action.acctId; 
            let acctType = action.acctType;

            for(let i = 0; i < state.accounts.length; ++i){
                let curr = state.accounts[i];
                if (curr.id !== acctId) {
                    continue;
                }
                curr.acctType = acctType;
                break;
            }
            return {...state};

        case ACCOUNTS.SET_PORTFOLIO_NAME:

            acctId = action.acctId; 
            let name = action.name;

            for(let i = 0; i < state.accounts.length; ++i){
                let curr = state.accounts[i];
                if (curr.id !== acctId) {
                    continue;
                }
                curr.name = name;
                break;
            }
            return {...state};
        default:
            return state;
    }
}

export default accountsReducer