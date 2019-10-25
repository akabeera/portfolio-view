import { ACCOUNT } from './types';
import uuid from 'uuid/v4';

export const addAccountRow = (id) => {
    const holdingsJson = {
            id: uuid(),
            symbol: '',
            shares: 0.0,
            cost: 0.0,
            buyCommission: 0.0,
            sellCommission: 0.0,
            date: ''
    };

    return {type:ACCOUNT.ADD_ROW, newHoldings:holdingsJson};
}

export const updateRow = (id, fieldName, fieldValue) => {
    return {type:ACCOUNT.UPDATE_ROW, id:id, fieldName:fieldName, fieldValue:fieldValue};
}

export const selectAccountType = (acctType) => {
    return {type:ACCOUNT.SELECT_ACCT_TYPE, acctType:acctType};
}