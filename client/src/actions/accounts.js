import { ACCOUNTS } from './types';
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

    return {type:ACCOUNTS.ADD_ROW, acctId:id, newHoldings:holdingsJson};
}

export const updateRow = (acctId, id, fieldName, fieldValue) => {
    return {type:ACCOUNTS.UPDATE_ROW, acctId:acctId, id:id, fieldName:fieldName, fieldValue:fieldValue};
}

export const selectAccountType = (acctType) => {
    return {type:ACCOUNTS.SELECT_ACCT_TYPE, acctType:acctType};
}

export const addAccount = () => {
    const newAccount = {
        id: uuid(),
        acctType: 'manual',
        name: '',
        description: '',
        lastUpdated: '',
        holdings: []
    };

    return {type:ACCOUNTS.ADD_ACCOUNT, newAccount: newAccount};
}

export const loadAccounts = () => {
    return {type:ACCOUNTS.LOAD};
}

export const saveAccounts = () => {
    return {type:ACCOUNTS.SAVE};
}