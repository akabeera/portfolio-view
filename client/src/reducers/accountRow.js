import { ACCOUNT } from '../actions/types';

const DEFAULT_ACCOUNT_ROW = {
    id: '',
    symbol: '',
    shares: 0.0,
    cost: 0.0,
    buyCommission: 0.0,
    sellCommission: 0.0,
    date: ''
}

const accountRowReducer = (state = DEFAULT_ACCOUNT_ROW, action) => {

    switch(action.type){
        case ACCOUNT.UPDATE_ROW:
            return state;
        default:
            return state;
    }
}

export default accountRowReducer;