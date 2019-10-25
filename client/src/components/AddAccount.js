import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addAccountRow, updateRow, selectAccountType} from '../actions/addAccount';
import './account.css';
import ls from 'local-storage';

class AddAccount extends Component {

    saveAccount = () => {
        
    }

    discard = () => {
        
    }

    updateHoldingsField = (evt, id, fieldName) => {
        let fieldValue = evt.target.value;
        this.props.updateRow(id, fieldName, fieldValue)();
    }
 
    render(){

        //const {id, acctType, holdings, addAccountRow, selectAccountType} = this.props;
        const {holdings, addAccountRow, selectAccountType, updateRow} = this.props;
        return  (
            <div>
                <div className='acct' id='acct-type'>
                    TYPE
                    <select onChange={selectAccountType}>
                        <option value='select'>Select</option>
                        <option value='manual'>Manual</option>
                        <option value='etrade'>eTrade</option>
                        <option value='coinbase'>CoinBase</option>
                    </select>

                    <button onClick={this.saveAccount}>SAVE</button>
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
                        <input placeholder="ENTER PORTFOLIO NAME"></input>
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
                    this.props.holdings.map((holding) => {
                        const { id, symbol, shares, cost, buyCommission, sellCommission, date } = holding;
                        return (
                            <div key={id} className='row acct'>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'SYMBOL')} defaultValue = {symbol} type='text'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'SHARES')} defaultValue = {shares} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'COST')} defaultValue = {cost} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'BUYCOMM')} defaultValue = {buyCommission} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'SELLCOMM')} defaultValue = {sellCommission} type='number'></input>
                                </div>
                                <div className="col-2">
                                    <input onChange={(e) => this.updateHoldingsField(e, id, 'DATE')} defaultValue = {date} type='date'></input>  
                                </div>              
                            </div>
                        )
                    })
                }
                <div className="row">
                    <div className="col-12">
                        <button onClick={addAccountRow()}>Add</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAccountRow: () => () => dispatch(addAccountRow()),
        selectAccountType: (acctType) => () => dispatch(selectAccountType(acctType)),
        updateRow: (id, fieldName, fieldValue) => () => dispatch(updateRow(id, fieldName, fieldValue))
    }
};

const mapStateToProps = (state) => {
    const { id, acctType, holdings } = state.addAccount;
    return { id: id, acctType:acctType, holdings: holdings };
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);
export default componentConnector(AddAccount);