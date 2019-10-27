import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addAccount, addAccountRow, updateRow, selectAccountType, setPortfolioName, saveAccounts} from '../actions/accounts';
import './account.css';

class AddAccount extends Component {

    componentDidMount() {
        this.props.addAccount();
    }

    saveAccount = () => {
        this.props.saveAccounts();
    }

    discard = () => {
        
    }

    updateHoldingsField = (evt, acctId, id, fieldName) => {
        let fieldValue = evt.target.value;
        this.props.updateRow(acctId, id, fieldName, fieldValue)();
    }

    selectAccountType = (evt, acctId) => {
        let acctType = evt.target.value;
        this.props.selectAccountType(acctId, acctType)();
    }

    setPortfolioName = (evt, acctId) => {
        let name = evt.target.value;
        this.props.setPortfolioName(acctId, name)();
    }
 
    render() {
        const {id, holdings, addAccountRow, saveAccounts} = this.props;
        let acctId = id;
        return  (
            <div>
                <div className='acct' id='acct-type'>
                    TYPE
                    <select onChange={(e) => this.selectAccountType(e, acctId)}>
                        <option value='select'>Select</option>
                        <option value='manual'>Manual</option>
                        <option value='etrade'>eTrade</option>
                        <option value='coinbase'>CoinBase</option>
                    </select>

                    <button onClick={saveAccounts()}>SAVE</button>
                    <button onClick={this.discard}>CANCEL</button>
                </div> 
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <h1>PORTFOLIO NAME</h1>
                    </div>
                </div>
                
                <div className="row">
                    <div id='portfolio-name' className="col-12 acct">
                        <input onChange={(e) => this.setPortfolioName(e, acctId)} placeholder="ENTER PORTFOLIO NAME"></input>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-12">
                        <h1>HOLDINGS</h1>
                    </div>
                </div>
                
                <hr/>

                <div className="row">
                    <div className="col-2">
                        <h2>SYMBOL</h2>
                    </div>

                    <div className="col-2">
                        <h2>SHARES</h2>
                    </div>

                    <div className="col-2">
                        <h2>COST</h2>
                    </div>

                    <div className="col-2">
                        <h2>BUY COMM.</h2>
                    </div>

                    <div className="col-2">
                        <h2>SELL COMM.</h2>
                    </div>

                    <div className="col-2">
                        <h2>DATE</h2>
                    </div>
                </div>
                {
                    holdings.map((holding) => {
                        const { id, symbol, shares, cost, buyCommission, sellCommission, date } = holding;
                        return (
                            <div key={id} className='row acct'>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'SYMBOL')} defaultValue = {symbol} type='text'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'SHARES')} defaultValue = {shares} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'COST')} defaultValue = {cost} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'BUYCOMM')} defaultValue = {buyCommission} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'SELLCOMM')} defaultValue = {sellCommission} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, acctId, id, 'DATE')} defaultValue = {date} type='date'></input>  
                                </div>              
                            </div>
                        )
                    })
                }
                <div className="row">
                    <div className="col-12">
                        <button onClick={addAccountRow(id)}>Add</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAccount: () => dispatch(addAccount()),
        addAccountRow: (acctId) => () => dispatch(addAccountRow(acctId)),
        selectAccountType: (acctId, acctType) => () => dispatch(selectAccountType(acctId, acctType)),
        saveAccounts: () => () => dispatch(saveAccounts()),
        updateRow: (acctId, id, fieldName, fieldValue) => () => dispatch(updateRow(acctId, id, fieldName, fieldValue)),
        setPortfolioName: (acctId, name) => () => dispatch(setPortfolioName(acctId, name))
    }
};

const mapStateToProps = (state) => {
    const {accounts} = state;
    if (!accounts || !accounts.accounts || accounts.accounts.length === 0) {
        return { id: '', acctType:'manual', holdings: [] };
    } else {
        let newAccount = accounts.accounts[accounts.accounts.length-1];
        const { id, acctType, holdings } = newAccount;
        return { id: id, acctType:acctType, holdings: holdings };
    }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);
export default componentConnector(AddAccount);