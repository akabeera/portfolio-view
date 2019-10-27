import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadAccounts, saveAccounts } from '../actions/accounts';
import { Link } from 'react-router-dom';
import './account.css';

const API_URL = 'https://financialmodelingprep.com/api/v3/company/profile/';

const rowStyle = {
    display: 'inline-block',
    margin: 10
};

const rowProfit = {
    display: 'inline-block',
    margin: 10,
    color: 'yellowgreen'
};

const rowLoss = {
    display: 'inline-block',
    margin: 10,
    color: 'red'
};

class Ticker extends Component {
    state = {ticker: this.props.holding, loadingPrice: false, tickerPrice: 0.0, tickerProfile: null};

    componentDidMount(){
        this.setState({loadingPrice:true});
        fetch(`${API_URL}${this.state.ticker.symbol}`)
            .then(response => response.json())
            .then(json => this.setState({loadingPrice:false, tickerPrice:json.profile.price, tickerProfile: json.profile}))
            .catch(error => console.log(error));
    }

    formatNumber = (num) => {
        return parseFloat(Math.round(num)).toFixed(2);
    }

    render() { 
        const {ticker, tickerProfile} = this.state;
        if (!tickerProfile) return null;

        const {price, changes, changesPercentage, companyName} = tickerProfile;

        const totalCommission = parseFloat(ticker.buycomm) + parseFloat(ticker.sellcomm);
        const cost = parseFloat(ticker.cost);
        const shares = parseFloat(ticker.shares);

        const marketValue = this.formatNumber(price * ticker.shares);
        const profit = this.formatNumber(marketValue - (cost * shares) - totalCommission);
        const profitPercentage = this.formatNumber((profit / ((cost * shares) + totalCommission) * 100));
        const symbol = ticker.symbol.toUpperCase();

        return (
            <div className='row'>
                <div className='col-1'>
                    <h3>{symbol}</h3>
                </div>
                <div className='col-1'>
                    <h3 style={rowStyle}>{price}</h3>
                </div>
                <div className='col-2'>
                    <h3 style={changes >= 0 ? rowProfit : rowLoss}>{changes} {changesPercentage}</h3>
                </div>
                <div className='col-1'>
                    <h3 style={rowStyle}>{shares}</h3>
                </div>
                <div className='col-2'>
                    <h3 style={rowStyle}>{cost}</h3>
                </div>
                <div className='col-2'>
                    <h3 style={rowStyle}>{marketValue}</h3>
                </div>
                <div className='col-1'>
                    <h3 style={profit >= 0 ? rowProfit : rowLoss}>{profit}</h3>
                </div>
                <div className='col-1'>
                    <h3 style={profit >= 0 ? rowProfit : rowLoss}>{profitPercentage}%</h3>
                </div>
                <div className='col-1'>
                    <h3 style={rowStyle}>{totalCommission}</h3>
                </div>
            </div>
        )
    }
}


class App extends Component {

    componentDidMount() {
        this.props.loadAccounts();
    }

    render(){
        const {accounts} = this.props.accounts;

        return  (
            <div>
                <div>
                    <h3 id='addBtn'><Link to='/add'>+ Add</Link></h3>
                </div>
                {
                    accounts && accounts.length === 0 ? (
                        <div>
                            <h3>No Accounts.</h3>
                        </div>
                    ) : 
                    (
                        <div>
                            {
                                accounts.map((account) => (
                                    <div key={account.id}>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <h1>PORTFOLIOS</h1>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <h2>{account.name}</h2>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <h2>Symbol</h2>
                                            </div>
                                            <div className='col-1'>
                                                <h2>Price</h2>
                                            </div>
                                            <div className='col-2'>
                                                <h2>Change</h2>
                                            </div>
                                            <div className='col-1'>
                                                <h2>Shares</h2>
                                            </div>
                                            <div className='col-2'>
                                                <h2>Cost</h2>
                                            </div>
                                            <div className='col-2'>
                                                <h2>Market Value</h2>
                                            </div>
                                            <div className='col-1'>
                                                <h2>Profit ($)</h2>
                                            </div>
                                            <div className='col-1'>
                                                <h2>Profit (%)</h2>
                                            </div>
                                            <div className='col-1'>
                                                <h2>Comm.</h2>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            {
                                                account.holdings.map((holding) => (
                                                    <Ticker key={holding.id} holding={holding}/>
                                                ))
                                            }
                                        </div>
                                </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAccounts: () => dispatch(loadAccounts()),
        saveAccounts: (accounts) => () => dispatch(saveAccounts(accounts))
    }
}

const mapStateToProps = (state) => {
    const { accounts } = state;
    return { accounts: accounts }
}
const componentConnector = connect(mapStateToProps, mapDispatchToProps);
export default componentConnector(App);