import React from 'react';
import { connect } from 'react-redux';
import './account.css';

const AccountRow = (props) => {
    const { id, symbol, shares, cost, buyCommission, sellCommission, date } = props.holding;
    return(
        <div className='acct acctRow'>
            <input value = {symbol} type='text' placeholder='SYMBOL'></input>
            <input value = {shares} type='number' placeholder='SHARES'></input>
            <input value = {cost} type='number' placeholder='COST/SHARE'></input>
            <input value = {buyCommission} type='number' placeholder='BUY COMM.'></input>
            <input value = {sellCommission} type='number' placeholder='SELL COMM.'></input>
            <input value = {date} type='date' placeholder='DATE'></input>                
        </div>
    );
}
/*
const mapDispatchToProps = dispatch => {
    return {
        updateAccountRow: (rowId) => () => dispatch(updateAccountRow(id))
    }
}

export default connect(
    (state) => ({id: state.accountRow.id, symbol:state.accountRow.symbol,
        shares: state.accountRow.shares, cost:state.accountRow.cost, 
        buyCommission:state.accountRow.buyCommission, 
        sellCommission:state.accountRow.sellCommission, date:state.accountRow.date}),
    mapDispatchToProps
)(AccountRow);
*/
export default AccountRow;