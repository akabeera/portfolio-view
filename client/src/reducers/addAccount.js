import { ACCOUNT } from '../actions/types';

const DEFAULT_ACCOUNT = {
    id: '',
    acctType: 'manual',
    holdings:[]
}

const addAccountReducer = (state = DEFAULT_ACCOUNT, action) => {

    let acctType, newHoldings;

    switch(action.type){
        case ACCOUNT.ADD_ROW:
            ({newHoldings} = action);
            let holdings = state.holdings.slice();
            holdings.push(newHoldings)
            return {...state, holdings};
            
        case ACCOUNT.UPDATE_ROW:
            
            let id = action.id;
            let fieldName = action.fieldName;
            let fieldValue = action.fieldValue;

            let updatedHoldings = state.holdings.slice();

            let idx = -1;
            for (var i = 0; i<updatedHoldings.length; ++i){
                if (updatedHoldings[i].id === id){
                    idx = i;
                    break;
                }
            }
            updatedHoldings[idx][fieldName] = fieldValue;
            return {...state, updatedHoldings};
            
        case ACCOUNT.SELECT_ACCT_TYPE:
            ({acctType} = action.acctType);
            return {...state, acctType}
        default:
            return state;
    }
}

export default addAccountReducer;