import { ACCOUNTS } from './types';
import ls from 'local-storage';

export const loadAccounts = () => {
    const accounts = ls.get('accounts') || [];

    return {type:ACCOUNTS.LOAD, accounts: accounts};
}

export const saveAccounts = (accounts) => {
    return {type:ACCOUNTS.SAVE, accounts:accounts};
}